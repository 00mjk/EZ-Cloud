export default function () {
  return {
    loggedInUser: 'tmasse',
    authToken: '',
    openCollectors: [
      // {
      //   uid: ';,
      //   name: '',
      //   hostname: '',
      //   port: 22,
      //   authenticationMethod: 'password', // password, private_key
      //   username: '',
      //   password: '',
      //   privateKey: '',
      //   pipelines: [
      //     {
      //       uid: '', // UID of the Pipeline
      //       enabled: false // This Pipeline enabled on this OC
      //     }
      //   ],
      //   osVersion: '',
      //   ocInstalled: false,
      //   ocVersion: '',
      //   fbInstalled: false,
      //   fbVersion: ''
      // },
      {
        uid: 'd25e3226-a90d-11eb-bcbc-0242ac130002',
        name: 'OC-1',
        hostname: '192.168.0.223',
        port: 22,
        authenticationMethod: 'password', // password, private_key
        username: 'root',
        password: 'logrhythm!1',
        privateKey: null,
        pipelines: [
          {
            uid: 'b9f7c85a-a278-11eb-bcbc-0242ac130002', // UID of the Pipeline
            enabled: false // This Pipeline enabled on this OC
          }
        ],
        osVersion: '',
        ocInstalled: false,
        ocVersion: '',
        fbInstalled: false,
        fbVersion: ''
      },
      {
        uid: '4bfffe8e-a90e-11eb-bcbc-0242ac130002',
        name: 'OC-2',
        hostname: '192.168.0.101',
        port: 22,
        authenticationMethod: 'password', // password, private_key
        username: 'root',
        password: 'logrhythm!1',
        privateKey: null,
        pipelines: [],
        osVersion: '',
        ocInstalled: false,
        ocVersion: '',
        fbInstalled: false,
        fbVersion: ''
      },
      {
        uid: '5c23be18-a90e-11eb-bcbc-0242ac130002',
        name: 'OC-LAB',
        hostname: '192.168.4.28',
        port: 22,
        authenticationMethod: 'private_key', // password, private_key
        username: null,
        password: null,
        privateKey: 'logrhythm!logrhythm!logrhythm!logrhythm!logrhythm!',
        pipelines: [],
        osVersion: '',
        ocInstalled: false,
        ocVersion: '',
        fbInstalled: false,
        fbVersion: ''
      }
    ],
    pipelines: [
      // {
      //   uid: '',
      //   name: '',
      //   status: 'New', // New, Dev, Ready
      //   primaryOpenCollector: '', // UID of the main OC
      //   fieldsMapping: [],
      //   collectionConfig: {}
      // },
      {
        uid: 'b9f7c85a-a278-11eb-bcbc-0242ac130002',
        name: 'Mistnet',
        status: 'Dev', // New, Dev, Ready
        primaryOpenCollector: 'd25e3226-a90d-11eb-bcbc-0242ac130002', // UID of the main OC
        fieldsMapping: [],
        collectionConfig: {}
      },
      {
        uid: '7dc7d568-a90e-11eb-bcbc-0242ac130002',
        name: 'Magic Cloud 2000',
        status: 'New', // New, Dev, Ready
        primaryOpenCollector: '5c23be18-a90e-11eb-bcbc-0242ac130002', // UID of the main OC
        fieldsMapping: [],
        collectionConfig: {}
      },
      {
        uid: 'b9e1cf48-a910-11eb-bcbc-0242ac130002',
        name: 'Azure Event Hub',
        status: 'Ready', // New, Dev, Ready
        primaryOpenCollector: '5c23be18-a90e-11eb-bcbc-0242ac130002', // UID of the main OC
        fieldsMapping: [],
        collectionConfig: {}
      }
    ],
    logSamples: [
      {
        pipelineUid: '',
        logs: []
      }
    ],
    jqFilterTemplate: `# -------------------------------------------
# THIS TRANSFORM WAS AUTOMATICALLY GENERATED.
# ANY MANUAL MODIFICATION WILL BE LOST.
# -------------------------------------------
# Generated on: {{EZ_generation_timestamp}}
# By: {{EZ_generation_user}}
# For Stream: {{EZ_stream_name_placeholder}}
# UID: {{EZ_stream_id_placeholder}}
# -------------------------------------------

# is_{{EZ_beatname_placeholder}} checks if the data matches the {{EZ_stream_name_placeholder}} criteria
def is_{{EZ_beatname_placeholder}}:
    ."@metadata".beat == "filebeat"
    and
    (
      .fields.stream.id == "{{EZ_stream_id_placeholder}}"
      or
      .fields.stream.name == "{{EZ_stream_name_placeholder}}"
    )
;
   `,
    jqTransformTemplate: `# -------------------------------------------
# THIS TRANSFORM WAS AUTOMATICALLY GENERATED.
# ANY MANUAL MODIFICATION WILL BE LOST.
# -------------------------------------------
# Generated on: {{EZ_generation_timestamp}}
# By: {{EZ_generation_user}}
# For Stream: {{EZ_stream_name_placeholder}}
# UID: {{EZ_stream_id_placeholder}}
# -------------------------------------------

# -----------------
# UTILITY FUNCTIONS
# -----------------

# flatten_array will flatten or fan out the pipeline, returning n values
#  where n is the number of array records in the log message. If there are no records
#  the input is returned unchanged
def flatten_array($log_msg_field):
    if $log_msg_field then
        if ($log_msg_field | length) > 0 then
            # flatten our records into one message each
            $log_msg_field[]
        else
            .
        end
    else
        .
    end
;

# add_field adds a key-value pair to the metadata objects generated by get_io_format
# Takes an input and output filter as parameters
# Capable of adding data to any of the objects in the metadata JSON (input, output, subrule, transform_path, etc)
# This function should be used for adding all metadata to your output - It scrubs illegal characters like | and \n
# Example function call: add_field(.input.field1; .output.subject)
def add_field($input_field; output_field):

    #Check for pipe character
    ($input_field | tojson) as $input_field_string
    
    (($input_field_string | contains("|")) or ($input_field_string | contains("\\n")) | not ) as $nobadchars

    if
        $input_field and $nobadchars
    then
        output_field = $input_field
    elif 
        $input_field and ($nobadchars | not)
    then
        #remove pipes and newline characters from input_field
        ($input_field_string | split("|") | join("-")) as $input_field_nopipes |
        ($input_field_nopipes | split("\\n") | join(" ")) as $input_field_nobadchars |
        output_field = ($input_field_nobadchars | fromjson)
    else
        .
    end
;

# -----------------
# DATA TRANSFORM
# -----------------

# get_io_format converts incoming data to a standard IO format. The original
#   content is added to the output in the "original_message" field automatically.
def get_io_format:
    {
        "input": .,
        "message": .message | fromjson,
{{EZ_flatten_array_placeholder}}
        "output": {
            "original_message": {{EZ_original_message_placeholder}}
        }
    }
;

# transform will normalize the incoming log into the LogRhythm Schema
#   that can then be forwarded to the SIEM
def transform:
    # First, convert to IO format.
    get_io_format |

    # beatname is a required field for Open Collector Regex to work in the SIEM.
    # We add here more details to help the Log Source Virtualisation

    add_field("{{EZ_beatname_placeholder}}"; .output.beatname) |
    add_field("{{EZ_stream_id_placeholder}}"; .output.stream_id) |
    add_field("{{EZ_stream_name_placeholder}}"; .output.stream_name) |

    # If required, the Fanned out fields

{{EZ_flatten_array__add_field_placeholder}}

    # The rest of the Fields mapping

{{EZ_add_field_placeholder}}

    # For the Sub Rules

{{EZ_sub_rules__add_field_placeholder}}

    # this filter produces the output object, for sending to SYSLOG output
    # This filter should be left in place in most cases
    .output
;
`
  }
}
/*
# Generated on: {{EZ_generation_timestamp}}
# By: {{EZ_generation_user}}
# For Stream: {{EZ_stream_name_placeholder}}
# UID: {{EZ_stream_id_placeholder}}
{{EZ_flatten_array_placeholder}}
            "original_message": {{EZ_original_message_placeholder}}
    add_field("{{EZ_beatname_placeholder}}"; .output.beatname) |
    add_field("{{EZ_stream_name_placeholder}}"; .output.stream_name) |
{{EZ_flatten_array__add_field_placeholder}}
#    add_field({{EZ_flatten_array_name_placeholder}}{{EZ_flatten_array_field_doted_path_placeholder}}; .output.{{EZ_mdi_field_placeholder}}) |
{{EZ_add_field_placeholder}}
    add_field({{EZ_message_placeholder}}{{EZ_field_doted_path_placeholder}}; .output.{{EZ_mdi_field_placeholder}}) |
{{EZ_sub_rules__add_field_placeholder}}
    add_field({{EZ_message_placeholder}}{{EZ_field_doted_path_placeholder}}; .output.tag1) |
*/
