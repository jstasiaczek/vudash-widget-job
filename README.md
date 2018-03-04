# Vudash Job Status Widget

Displays a job status, on a [Vudash](https://npmjs.org/vudash) Dashboard.

Currently supported:

- Jenkins
- Concourse

## Configuration

You need to add new data source:

### Concourse

    "concourse_pipeline_data_source" : {
            "module": "@vudash/datasource-rest",
            "options": {
            "method" : "get",
            "url": "http://{server_url}/api/v1/teams/{team_name}/pipelines/{pipeline_name}/jobs"
            }
    },

### Jenkins

    "jenkins_job_datasource" : {
            "module": "@vudash/datasource-rest",
            "options": {
            "method" : "get",
            "url": "http://{server_url}/job/{job_name}/lastBuild/api/json"
            }
    },


### Widget configuration

    {
        "position": {
            ...
        },
        "widget": "vudash-widget-job",
        "datasource": "concourse_pipeline_data_source",
        "options": {
            "description": "concourse pipeline status",
            "type" : "concourse"
        }
    }

Possible types:

- concourse
- jenkins

Default options:

    {
        description             : 'Job build status',
        font_ratio              : 6,
        type                    : 'none',
        color_progress          : '#3372e0',
        color_success           : '#85e055',
        color_fail              : '#ea0909',
        color_warning           : '#ed9f38',
        text_success            : 'SUCCESS',
        text_fail               : 'FAIL',
        text_fail_count         : 'FAIL (%count%)',
        text_parse_error        : '??',
        text_progess_unknown    : ['..', '...', '....', '.']
    }