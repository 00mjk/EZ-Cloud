// Get SQL config
const fs = require('fs');
const path = require('path');

// Create MS SQL object
const { Connection, Request, TYPES } = (
  process.env.databaseMode === 'mssql'
  || process.env.databaseMode === 'split'
    ? require('tedious')
    : { Connection: null, Request: null, TYPES: null }
);

// Create PostgreSQL object
const { Client } = (
  process.env.databaseMode === 'pgsql'
  || process.env.databaseMode === 'split'
    ? require('pg')
    : { Client: null }
);

// Load the System Logging functions
const { logToSystem } = require('./systemLogging');

// Get the crypto tools to work with password and keys
const { aesDecrypt } = require('./crypto');

// Global store for the availability of the databases
const currentPersistenceAvailability = {}

function waitMilliseconds(delay = 250) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
}

const maxCheckInterval = 10; // Check once every X seconds max, and/or timeout after X seconds

//        ##     ## ######## #### ##       #### ######## #### ########  ######
//        ##     ##    ##     ##  ##        ##     ##     ##  ##       ##    ##
//        ##     ##    ##     ##  ##        ##     ##     ##  ##       ##
//        ##     ##    ##     ##  ##        ##     ##     ##  ######    ######
//        ##     ##    ##     ##  ##        ##     ##     ##  ##             ##
//        ##     ##    ##     ##  ##        ##     ##     ##  ##       ##    ##
//         #######     ##    #### ######## ####    ##    #### ########  ######

/**
 * Returns the configuration necesary
 * to be able to connect to PostgreSQL
 * @returns PostgreSQL configuration object
 */
function getPgSqlConfig() {
  return {
    host: process.env.PG_HOST || 'oc-db',
    port: process.env.PG_PORT || 5432,
    user: process.env.PG_USER || 'oc-admin-backend',
    password: process.env.PG_PASS || undefined,
    database: process.env.PG_DB || 'oc-admin',
    application_name: `${process.env.NAME} - Version: ${process.env.VERSION}`
  };
}

/**
 * Returns the configuration necesary
 * to be able to connect to MS SQL.
 * @returns MS SQL configuration object
 */
async function getMsSqlConfig() {
  // Full MS SQL: Get config from File
  if (process.env.databaseMode === 'mssql') {
    return JSON.parse(
      fs.readFileSync(
        path.join(process.env.baseDirname, 'config', 'database.json'), 'utf8'
      )
    ).config;
  }

  // PgSQL and Split: Get config from PgSQL
  if (
    process.env.databaseMode === 'pgsql'
    || process.env.databaseMode === 'split'
  ) {
    try {
      const pgClient = new Client(getPgSqlConfig());
      await pgClient.connect();
      // Get MS SQL configuration from Setting entry '6e5625e8-372d-4d4b-ac9a-615e370ac940'
      const res = await pgClient.query('SELECT "settingsJson" FROM public."settings" WHERE "uid" = $1;', ['6e5625e8-372d-4d4b-ac9a-615e370ac940']);
      await pgClient.end();

      const sqlConfig = JSON.parse(
        (
          res && res.rows && Array.isArray(res.rows) && res.rows.length === 1
            ? res.rows[0].settingsJson || { config: null }
            : { config: null }
        )
      ).config;

      // Decrypt secrets
      // The MS SQL host, port, login and password are AES encrypted in PgSQL using
      // the private AES key specific to the deployment
      if (sqlConfig && sqlConfig.authentication && sqlConfig.authentication.options) {
        // Hostname
        sqlConfig.server = aesDecrypt(
          sqlConfig.server
        );
        // Login
        sqlConfig.authentication.options.userName = aesDecrypt(
          sqlConfig.authentication.options.userName
        );
        // Pass
        sqlConfig.authentication.options.password = aesDecrypt(
          sqlConfig.authentication.options.password
        );
      }

      // And ship out!!
      return sqlConfig;
    } catch (error) {
      logToSystem('Error', `Persistance Layer | Connection to database (Pg) failed. | Details: ${error.message}`);
    }
  }

  logToSystem('Error', 'Database mode couldn\'t be determined or other error. Not returning any MS SQL connection configuration.');
  // Fallback to a NULL value so it's easy for the caller to check validity of the config
  return null;
}

/**
 * Gets the data from MS SQL using `parameters.query`
 * and dump it in the `parameters.targetVariable`
 * @param {*} parameters Object containing the target variable, query and variables (values)
 */
async function getDataFromMsSql(parameters) {
  let stillChecking = true;
  if (parameters && parameters.query && parameters.query.length && parameters.targetVariable) {
    const { targetVariable, query, variables } = parameters;
    targetVariable.stillChecking = true;
    targetVariable.errors = [];
    targetVariable.outputs = [];
    targetVariable.payload = [];

    try {
      // Connect
      const connection = new Connection(await getMsSqlConfig());

      // Connection event handler
      connection.on('connect', (connectionError) => {
        if (connectionError) {
          targetVariable.errors.push('Connection to database failed');
          targetVariable.stillChecking = false;
          stillChecking = false;
          // throw connectionError;
          logToSystem('Error', `Persistance Layer | Connection to database failed. | Details: ${JSON.stringify(connectionError)}`);
        }

        // Exec the query
        const request = new Request(query, (err, rowCount) => {
          if (err) {
            targetVariable.errors.push(err);
          }
          if (rowCount) {
            targetVariable.outputs.push(`${rowCount} row(s) returned`);
          }
          targetVariable.stillChecking = false;
          stillChecking = false;

          // And close the SQL connection
          connection.close();
        });

        if (variables && Array.isArray(variables)) {
          variables.forEach((variable) => {
            if (variable.name && variable.name.length > 0) {
              request.addParameter(
                variable.name,
                TYPES[variable.type],
                (
                // eslint-disable-next-line no-nested-ternary
                  (variable.value !== undefined) && (variable.value !== null)
                    ? (
                      typeof variable.value === 'object'
                        ? JSON.stringify(variable.value)
                        : variable.value
                    )
                    : null
                )
              );
              // if (typeof variable.value === 'string') {
              //   request.addParameter(variable.name, TYPES.NVarChar, (variable.value || null));
              // }
              // if (typeof variable.value === 'number') {
              //   request.addParameter(variable.name, TYPES.Int, (variable.value || null));
              // }
              // if (typeof variable.value === 'boolean') {
              //   request.addParameter(variable.name, TYPES.TinyInt, (variable.value > 0));
              // }
              // if (variable.value === null) {
              //   request.addParameter(variable.name, TYPES.Null, null);
              // }
            }
          });
        }

        request.on('row', (columns) => {
          // Make sure targetVariable.payload is an array
          if (!targetVariable.payload || targetVariable.payload === null) {
            targetVariable.payload = [];
          }

          // Compile the row using all its columns
          const row = {};
          columns.forEach((column) => {
            row[column.metadata.colName] = column.value;
          });
          targetVariable.payload.push(row);
        });

        // And run it
        connection.execSql(request);
      });

      // Kick it all off!
      connection.connect();

      // Wait, by default, for the query to happen (or fail) before returning to caller
      if (!parameters.noWait) {
        const loopEndTime = Date.now() / 1000 + maxCheckInterval;

        // Waiting - Sync
        while (targetVariable.stillChecking && (loopEndTime > (Date.now() / 1000))) {
          // Wait for 50 ms
          // eslint-disable-next-line no-await-in-loop
          await waitMilliseconds(50);
        }
        if (stillChecking || targetVariable.stillChecking) {
          targetVariable.errors.push('Timeout');
        }
        targetVariable.stillChecking = false;
        stillChecking = false;
      }
    } catch (error) {
      logToSystem('Error', `Persistance Layer | Connection to database failed. | Details: ${error.message}`);
      targetVariable.errors.push('Connection to database failed');
      targetVariable.stillChecking = false;
      stillChecking = false;
    }
  }
}

/**
 * Creates the array of fields type mapping to be
 * provided to `getDataFromMsSql` as `parameters.targetVariable`
 * @param {*} req Express Router's request object
 * @param {Array} definitions List of field names and their types
 * @returns Array of objects with name, type and value
 */
function createMsSqlVariables(req, definitions) {
  const variables = [];
  if (req && (req.query || req.body) && definitions && Array.isArray(definitions)) {
    definitions.filter((def) => def.name && def.type && def.name.length && def.type.length)
      .forEach((def) => {
        variables.push({
          name: def.name,
          type: def.type,
          /* eslint-disable no-nested-ternary */
          value: (
            req.body && (req.body[def.name] !== undefined)
              ? req.body[def.name]
              : (
                req.query && (req.query[def.name] !== undefined)
                  ? req.query[def.name]
                  : null
              )
          )
          /* eslint-enable no-nested-ternary */
        });
      });
  }
  return variables;
}

/**
 * Create the array of fields type mapping to be
 * provided to `getDataFromPgSql` as `parameters.targetVariable`
 * @param {*} req Express Router's request object
 * @param {Array} definitions List of field names
 * @returns Array of values
 */
function createPgSqlVariables(req, definitions) {
  const variables = [];
  if (req && (req.query || req.body) && definitions && Array.isArray(definitions)) {
    definitions.filter((def) => def.name && def.name.length)
      .forEach((def) => {
        variables.push(
          (
            // eslint-disable-next-line no-nested-ternary
            req.body && (req.body[def.name] !== undefined)
              ? (
                // PgSQL seems to only take the first item of it when provided an array as variable
                Array.isArray(req.body[def.name])
                  ? JSON.stringify(req.body[def.name])
                  : req.body[def.name]
              )
              : (
                req.query && (req.query[def.name] !== undefined)
                  ? req.query[def.name]
                  : null
              )
          )
        );
      });
  }
  return variables;
}

/**
 * Create the array of fields type mapping to be provided to
 * getDataFromMsSql as `parameters.targetVariable` using `createMsSqlVariables()`
 * and trimming any entry with a NULL or Undefined value.
 *
 * Useful when calling Stored Procedures that expect missing parameters to
 * fall back on default values.
 * @param {*} req Express Router's request object
 * @param {Array} definitions List of field names
 * @param {Boolean} weedOut True to weed out entries with NULL or Undefined values. Default True.
 * @returns Array of variables and parameters for the Stored Procedure
 */
function createMsSqlVariablesAndStoredProcParams(req, definitions, weedOut = true) {
  // Prep SQL Variables
  const sqlVariablesRaw = createMsSqlVariables(req, definitions);

  // Weed out all the ones with NULL or Undefined
  // This is done as the SQL Stored Procedure will use default values if a param is not provided
  // But by default, createMsSqlVariables() puts NULL, and that's no good

  const storedProcedureParams = [];
  const sqlVariables = [];

  sqlVariablesRaw.forEach((variable) => {
    if ((variable.value !== undefined && variable.value !== null) || weedOut === false) {
      sqlVariables.push(variable);
      storedProcedureParams.push(`@${variable.name} = @${variable.name}`);
    }
  });

  return [sqlVariables, storedProcedureParams];
}

/**
 * Gets the data from PostgreSQL using `parameters.query`
 * and dump it in the `parameters.targetVariable`
 * @param {Object} parameters Object containing the target variable, query and variables (values)
 */
async function getDataFromPgSql(parameters) {
  if (parameters && parameters.query && parameters.query.length && parameters.targetVariable) {
    const {
      targetVariable,
      query,
      variables,
      returnSingleItem = false // False, returns full array. True, returns only first element
    } = parameters;

    targetVariable.stillChecking = true;
    targetVariable.errors = [];
    targetVariable.outputs = [];
    targetVariable.payload = [];

    try {
      // Connect
      const pgClient = new Client(getPgSqlConfig());
      await pgClient.connect();

      // Exec the query
      const res = await pgClient.query(
        query,
        variables
      );
      await pgClient.end();

      // Push to targetVariable.payload
      if (!returnSingleItem) {
        targetVariable.payload = res.rows;
      } else {
        targetVariable.payload = (
          res.rows
          && Array.isArray(res.rows)
          && res.rows.length
            ? res.rows[0]
            : undefined
        );
      }
      targetVariable.stillChecking = false;
      logToSystem('Debug', `Persistance Layer | targetVariable.payload | Details: ${JSON.stringify(targetVariable.payload)}`); // XXXX
    } catch (error) {
      logToSystem('Error', `Persistance Layer | Connection to database failed. | Details: ${error.message}`);
      targetVariable.errors.push('Connection to database failed');
      targetVariable.stillChecking = false;
    }
  }
}

/**
 * DEPRECIATED
 * Use `databaseMode` to determine which utilitarian function to use.
 * Designed to query the EZ database (the "config" DB), as opposed to the SIEM.
 * @param {Object} parameters Object containing the target variable, query and variables (values)
 */
async function getConfigDataFromSql(parameters) {
  if (
    process.env.databaseMode === 'mssql'
  ) {
    // Use MS SQL
    await getDataFromMsSql(parameters);
  } else {
    // Use PgSQL
    await getDataFromMsSql(parameters); // XXXX MODIFY !!!!
  }
}

/**
 * DEPRECIATED
 * Use `databaseMode` to determine which utilitarian function to use.
 * Designed to query the SIEM "EMDB" database, as opposed to the EZ "config" database.
 * @param {Object} parameters Object containing the target variable, query and variables (values)
 */
async function getSiemDataFromSql(parameters) {
  if (
    process.env.databaseMode === 'mssql'
    || process.env.databaseMode === 'split'
  ) {
    // Use MS SQL
    await getDataFromMsSql(parameters);
  } else {
    // Use PgSQL
    await getDataFromMsSql(parameters); // XXXX MODIFY !!!!
  }
}

async function checkPgSqlAvailability() {
  if (
    process.env.databaseMode === 'pgsql'
    || process.env.databaseMode === 'split'
  ) {
    // Check PostgreSQL
    logToSystem('Verbose', `Checking for PG availabilities...`);

    let response = false;

    try {
      // Get SQL config
      const configSql = await getPgSqlConfig();
      
      // Connect
      const pgClient = new Client(configSql);
      // Connection event handler
      // try to connect
      await pgClient.connect();
      response = true;
      await pgClient.end();
    } catch (error) {
      logToSystem('Debug', `PG SQL is not available | Details: ${error.message}`);
    }

    return response;
  } else {
    // No PostgreSQL to be checked
    return null;
  }
}

async function checkMsSqlAvailability() {
  if (
    process.env.databaseMode === 'mssql'
    || process.env.databaseMode === 'split'
    ) {
    // Check MS SQL
    logToSystem('Verbose', `Checking for MS availabilities...`);

    let response = false;
    let stillChecking = true;
    const timeoutSeconds = 5; // Timeout after X seconds

    try {
      // Get SQL config
      const configSql = await getMsSqlConfig();

      // Connect
      const connection = new Connection(configSql);

      // Connection event handler
      connection.on('connect', (connectionError) => {
        if (!connectionError) {
          response = true;
        }
        try {
          connection.close();
        } catch (error) {
          //
        } finally {
          stillChecking = false;
        }
      });

      // try to connect
      connection.connect();

      // Wait, by default, for the attempt to happen (or fail) before returning to caller
      const loopEndTime = Date.now() / 1000 + timeoutSeconds;

      // Waiting - Sync
      while (stillChecking && (loopEndTime > (Date.now() / 1000))) {
        // Wait for 50 ms
        // eslint-disable-next-line no-await-in-loop
        await waitMilliseconds(50);
      }
      stillChecking = false;
    } catch (error) {
      logToSystem('Debug', `MS SQL is not available | Details: ${error.message}`);
    }
    return response;
  } else {
    // No MS SQL to be checked
    return null;
  }
}

/**
 * Check connection to the SQL systems and keep checkin until they are all good.
 * Stores its results in global (to `sqlUtils`) variable `currentPersistenceAvailability`
 * @param {boolean} keepCheckingOnFailure If TRUE, schedule another try if any of the DB is not available
 * @param {number} triesCounter Accumulator of number of attempts
 */
async function checkPersistenceAvailability(keepCheckingOnFailure = true, triesCounter = 1) {
  logToSystem('Verbose', `Checking for Persistence layer availabilities (attempt # ${triesCounter})...`);
  logToSystem('Debug', `checkPersistenceAvailability 🚀 \`currentPersistenceAvailability\`: ${JSON.stringify(currentPersistenceAvailability)}`);

  const retryDelay = Number(process.env.databaseCheckDelay) || 2; // 2 seconds default delay, or whatever was provided in .env
  const maxRetryDelay = Number(process.env.databaseMaxCheckDelay) || 120; // 2 minutes max, or whatever was provided in .env

  const retryDelayInt = (
    maxRetryDelay >= retryDelay * triesCounter
      ? retryDelay * triesCounter
      : maxRetryDelay
    );

  currentPersistenceAvailability.pgSqlAvailable = currentPersistenceAvailability.pgSqlAvailable || await checkPgSqlAvailability(); // Check PG SQL no matter what. Will come back with NULL if it was not necessary

  if (currentPersistenceAvailability.pgSqlAvailable === false) {
    // PG SQL was required, but is not available
    // Rechedule another scan
    logToSystem('Warning', `Container \`oc-db\` is not available. Make sure to start it before the \`oc-admin\` container. Will try connecting again in ${retryDelayInt} seconds.`);

    setTimeout(() => {
      checkPersistenceAvailability(keepCheckingOnFailure, triesCounter + 1);
    }, retryDelayInt * 1000);
  } else if (
    (
      currentPersistenceAvailability.pgSqlAvailable === null // There is no need for PG SQL (we must be in MS SQL only mode)
      || currentPersistenceAvailability.pgSqlAvailable === true // PG SQL is available
    )
    && (
      process.env.databaseMode === 'mssql'
      || process.env.databaseMode === 'split'
    )
  ) {
    // Check MS SQL
    currentPersistenceAvailability.msSqlAvailable = await checkMsSqlAvailability();

  }

  if (currentPersistenceAvailability.msSqlAvailable === false) {
    // MS SQL was required, but is not available
    // Rechedule another scan
    logToSystem('Warning', `MS SQL on the XM or PM is not available (based on the current configuration), or is not yet configured in OC-Admin. Make sure to start it before the \`oc-admin\` container, and/or to configure it next time you login onto OC-Admin. Will try connecting again in ${retryDelayInt} seconds.`);

    setTimeout(() => {
      checkPersistenceAvailability(keepCheckingOnFailure, triesCounter + 1);
    }, retryDelayInt * 1000);
  }
  logToSystem('Debug', `checkPersistenceAvailability 🏁 \`currentPersistenceAvailability\`: ${JSON.stringify(currentPersistenceAvailability)}`);
}

/**
 * Gather the Current Persistence Layer Availability
 * @returns The Current Persistence Layer Availability as an object
 */
function getPersistenceAvailability() {
  return {
    pgSqlAvailable: currentPersistenceAvailability.pgSqlAvailable,
    msSqlAvailable: currentPersistenceAvailability.msSqlAvailable
  }
}

module.exports = {
  getPgSqlConfig,
  getMsSqlConfig,
  getDataFromMsSql,
  getDataFromPgSql,
  getConfigDataFromSql, // DEPRECIATED
  getSiemDataFromSql, // DEPRECIATED
  createMsSqlVariables,
  createPgSqlVariables,
  createMsSqlVariablesAndStoredProcParams,
  checkPgSqlAvailability,
  checkMsSqlAvailability,
  checkPersistenceAvailability,
  getPersistenceAvailability
};
