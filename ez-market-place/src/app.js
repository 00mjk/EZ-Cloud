const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
// const path = require('path');
// const fs = require('fs');

require('dotenv').config();

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '50mb' }));

const middlewares = require('./middlewares');
const api = require('./api');

// Log the Web requests / responses to the System Journal
app.use(middlewares.logHttpToSystem);
// To protect against clickjacking
app.use(middlewares.setXFrameOptions);
app.use(middlewares.setContentSecurityPolicy);

app.get('/test', (req, res) => {
  res.json({
    message: '👋 All good mate'
  });
});

app.use('/api/v1', api);

// // Static web site hosting:
// // - First, the home page
// app.get('/', (req, res) => {
//   res.sendFile(path.join(process.env.baseDirname, 'public_web_root', 'index.html'));
// });

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
