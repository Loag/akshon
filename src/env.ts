export namespace Env {
  // ---------------------------------------------------------------------------
  // Core / generic
  // ---------------------------------------------------------------------------
  export namespace Core {
    export namespace Name {
      export const CI = "CI" as const;
      export const GITHUB_ACTIONS = "GITHUB_ACTIONS" as const;
    }

    export namespace Env {
      export const CI = `env.${Name.CI}` as const;
      export const GITHUB_ACTIONS = `env.${Name.GITHUB_ACTIONS}` as const;
    }

    export namespace Shell {
      export const CI = `$${Name.CI}` as const;
      export const GITHUB_ACTIONS = `$${Name.GITHUB_ACTIONS}` as const;
    }
  }

  // ---------------------------------------------------------------------------
  // Action invocation / location
  // ---------------------------------------------------------------------------
  export namespace Action {
    export namespace Name {
      /** Current step's action ID-like name */
      export const GITHUB_ACTION = "GITHUB_ACTION" as const;
      /** Filesystem path to the action (composite actions) */
      export const GITHUB_ACTION_PATH = "GITHUB_ACTION_PATH" as const;
      /** owner/repo of the running action */
      export const GITHUB_ACTION_REPOSITORY = "GITHUB_ACTION_REPOSITORY" as const;
    }

    export namespace Env {
      export const GITHUB_ACTION = `env.${Name.GITHUB_ACTION}` as const;
      export const GITHUB_ACTION_PATH = `env.${Name.GITHUB_ACTION_PATH}` as const;
      export const GITHUB_ACTION_REPOSITORY =
        `env.${Name.GITHUB_ACTION_REPOSITORY}` as const;
    }

    export namespace Shell {
      export const GITHUB_ACTION = `$${Name.GITHUB_ACTION}` as const;
      export const GITHUB_ACTION_PATH = `$${Name.GITHUB_ACTION_PATH}` as const;
      export const GITHUB_ACTION_REPOSITORY =
        `$${Name.GITHUB_ACTION_REPOSITORY}` as const;
    }
  }

  // ---------------------------------------------------------------------------
  // Actor / who triggered
  // ---------------------------------------------------------------------------
  export namespace Actor {
    export namespace Name {
      export const GITHUB_ACTOR = "GITHUB_ACTOR" as const;
      export const GITHUB_ACTOR_ID = "GITHUB_ACTOR_ID" as const;
      export const GITHUB_TRIGGERING_ACTOR = "GITHUB_TRIGGERING_ACTOR" as const;
    }

    export namespace Env {
      export const GITHUB_ACTOR = `env.${Name.GITHUB_ACTOR}` as const;
      export const GITHUB_ACTOR_ID = `env.${Name.GITHUB_ACTOR_ID}` as const;
      export const GITHUB_TRIGGERING_ACTOR =
        `env.${Name.GITHUB_TRIGGERING_ACTOR}` as const;
    }

    export namespace Shell {
      export const GITHUB_ACTOR = `$${Name.GITHUB_ACTOR}` as const;
      export const GITHUB_ACTOR_ID = `$${Name.GITHUB_ACTOR_ID}` as const;
      export const GITHUB_TRIGGERING_ACTOR =
        `$${Name.GITHUB_TRIGGERING_ACTOR}` as const;
    }
  }

  // ---------------------------------------------------------------------------
  // API / server URLs
  // ---------------------------------------------------------------------------
  export namespace Api {
    export namespace Name {
      export const GITHUB_API_URL = "GITHUB_API_URL" as const;
      export const GITHUB_GRAPHQL_URL = "GITHUB_GRAPHQL_URL" as const;
      export const GITHUB_SERVER_URL = "GITHUB_SERVER_URL" as const;
    }

    export namespace Env {
      export const GITHUB_API_URL = `env.${Name.GITHUB_API_URL}` as const;
      export const GITHUB_GRAPHQL_URL = `env.${Name.GITHUB_GRAPHQL_URL}` as const;
      export const GITHUB_SERVER_URL = `env.${Name.GITHUB_SERVER_URL}` as const;
    }

    export namespace Shell {
      export const GITHUB_API_URL = `$${Name.GITHUB_API_URL}` as const;
      export const GITHUB_GRAPHQL_URL = `$${Name.GITHUB_GRAPHQL_URL}` as const;
      export const GITHUB_SERVER_URL = `$${Name.GITHUB_SERVER_URL}` as const;
    }
  }

  // ---------------------------------------------------------------------------
  // Pull request source/target refs
  // ---------------------------------------------------------------------------
  export namespace PullRequest {
    export namespace Name {
      export const GITHUB_BASE_REF = "GITHUB_BASE_REF" as const;
      export const GITHUB_HEAD_REF = "GITHUB_HEAD_REF" as const;
    }

    export namespace Env {
      export const GITHUB_BASE_REF = `env.${Name.GITHUB_BASE_REF}` as const;
      export const GITHUB_HEAD_REF = `env.${Name.GITHUB_HEAD_REF}` as const;
    }

    export namespace Shell {
      export const GITHUB_BASE_REF = `$${Name.GITHUB_BASE_REF}` as const;
      export const GITHUB_HEAD_REF = `$${Name.GITHUB_HEAD_REF}` as const;
    }
  }

  // ---------------------------------------------------------------------------
  // Event payload
  // ---------------------------------------------------------------------------
  export namespace Event {
    export namespace Name {
      export const GITHUB_EVENT_NAME = "GITHUB_EVENT_NAME" as const;
      export const GITHUB_EVENT_PATH = "GITHUB_EVENT_PATH" as const;
    }

    export namespace Env {
      export const GITHUB_EVENT_NAME = `env.${Name.GITHUB_EVENT_NAME}` as const;
      export const GITHUB_EVENT_PATH = `env.${Name.GITHUB_EVENT_PATH}` as const;
    }

    export namespace Shell {
      export const GITHUB_EVENT_NAME = `$${Name.GITHUB_EVENT_NAME}` as const;
      export const GITHUB_EVENT_PATH = `$${Name.GITHUB_EVENT_PATH}` as const;
    }
  }

  // ---------------------------------------------------------------------------
  // Job identity
  // ---------------------------------------------------------------------------
  export namespace Job {
    export namespace Name {
      export const GITHUB_JOB = "GITHUB_JOB" as const;
    }

    export namespace Env {
      export const GITHUB_JOB = `env.${Name.GITHUB_JOB}` as const;
    }

    export namespace Shell {
      export const GITHUB_JOB = `$${Name.GITHUB_JOB}` as const;
    }
  }

  // ---------------------------------------------------------------------------
  // Git refs / SHA
  // ---------------------------------------------------------------------------
  export namespace Refs {
    export namespace Name {
      export const GITHUB_REF = "GITHUB_REF" as const;
      export const GITHUB_REF_NAME = "GITHUB_REF_NAME" as const;
      export const GITHUB_REF_PROTECTED = "GITHUB_REF_PROTECTED" as const;
      export const GITHUB_REF_TYPE = "GITHUB_REF_TYPE" as const;
      export const GITHUB_SHA = "GITHUB_SHA" as const;
    }

    export namespace Env {
      export const GITHUB_REF = `env.${Name.GITHUB_REF}` as const;
      export const GITHUB_REF_NAME = `env.${Name.GITHUB_REF_NAME}` as const;
      export const GITHUB_REF_PROTECTED =
        `env.${Name.GITHUB_REF_PROTECTED}` as const;
      export const GITHUB_REF_TYPE = `env.${Name.GITHUB_REF_TYPE}` as const;
      export const GITHUB_SHA = `env.${Name.GITHUB_SHA}` as const;
    }

    export namespace Shell {
      export const GITHUB_REF = `$${Name.GITHUB_REF}` as const;
      export const GITHUB_REF_NAME = `$${Name.GITHUB_REF_NAME}` as const;
      export const GITHUB_REF_PROTECTED = `$${Name.GITHUB_REF_PROTECTED}` as const;
      export const GITHUB_REF_TYPE = `$${Name.GITHUB_REF_TYPE}` as const;
      export const GITHUB_SHA = `$${Name.GITHUB_SHA}` as const;
    }
  }

  // ---------------------------------------------------------------------------
  // Repository identity
  // ---------------------------------------------------------------------------
  export namespace Repository {
    export namespace Name {
      export const GITHUB_REPOSITORY = "GITHUB_REPOSITORY" as const;
      export const GITHUB_REPOSITORY_ID = "GITHUB_REPOSITORY_ID" as const;
      export const GITHUB_REPOSITORY_OWNER = "GITHUB_REPOSITORY_OWNER" as const;
      export const GITHUB_REPOSITORY_OWNER_ID =
        "GITHUB_REPOSITORY_OWNER_ID" as const;
    }

    export namespace Env {
      export const GITHUB_REPOSITORY =
        `env.${Name.GITHUB_REPOSITORY}` as const;
      export const GITHUB_REPOSITORY_ID =
        `env.${Name.GITHUB_REPOSITORY_ID}` as const;
      export const GITHUB_REPOSITORY_OWNER =
        `env.${Name.GITHUB_REPOSITORY_OWNER}` as const;
      export const GITHUB_REPOSITORY_OWNER_ID =
        `env.${Name.GITHUB_REPOSITORY_OWNER_ID}` as const;
    }

    export namespace Shell {
      export const GITHUB_REPOSITORY =
        `$${Name.GITHUB_REPOSITORY}` as const;
      export const GITHUB_REPOSITORY_ID =
        `$${Name.GITHUB_REPOSITORY_ID}` as const;
      export const GITHUB_REPOSITORY_OWNER =
        `$${Name.GITHUB_REPOSITORY_OWNER}` as const;
      export const GITHUB_REPOSITORY_OWNER_ID =
        `$${Name.GITHUB_REPOSITORY_OWNER_ID}` as const;
    }
  }

  // ---------------------------------------------------------------------------
  // Workflow run identity / attempt
  // ---------------------------------------------------------------------------
  export namespace Run {
    export namespace Name {
      export const GITHUB_RUN_ID = "GITHUB_RUN_ID" as const;
      export const GITHUB_RUN_NUMBER = "GITHUB_RUN_NUMBER" as const;
      export const GITHUB_RUN_ATTEMPT = "GITHUB_RUN_ATTEMPT" as const;
      export const GITHUB_RETENTION_DAYS = "GITHUB_RETENTION_DAYS" as const;
    }

    export namespace Env {
      export const GITHUB_RUN_ID = `env.${Name.GITHUB_RUN_ID}` as const;
      export const GITHUB_RUN_NUMBER = `env.${Name.GITHUB_RUN_NUMBER}` as const;
      export const GITHUB_RUN_ATTEMPT = `env.${Name.GITHUB_RUN_ATTEMPT}` as const;
      export const GITHUB_RETENTION_DAYS =
        `env.${Name.GITHUB_RETENTION_DAYS}` as const;
    }

    export namespace Shell {
      export const GITHUB_RUN_ID = `$${Name.GITHUB_RUN_ID}` as const;
      export const GITHUB_RUN_NUMBER = `$${Name.GITHUB_RUN_NUMBER}` as const;
      export const GITHUB_RUN_ATTEMPT = `$${Name.GITHUB_RUN_ATTEMPT}` as const;
      export const GITHUB_RETENTION_DAYS =
        `$${Name.GITHUB_RETENTION_DAYS}` as const;
    }
  }

  // ---------------------------------------------------------------------------
  // Workflow identity
  // ---------------------------------------------------------------------------
  export namespace Workflow {
    export namespace Name {
      export const GITHUB_WORKFLOW = "GITHUB_WORKFLOW" as const;
      export const GITHUB_WORKFLOW_REF = "GITHUB_WORKFLOW_REF" as const;
      export const GITHUB_WORKFLOW_SHA = "GITHUB_WORKFLOW_SHA" as const;
    }

    export namespace Env {
      export const GITHUB_WORKFLOW = `env.${Name.GITHUB_WORKFLOW}` as const;
      export const GITHUB_WORKFLOW_REF =
        `env.${Name.GITHUB_WORKFLOW_REF}` as const;
      export const GITHUB_WORKFLOW_SHA =
        `env.${Name.GITHUB_WORKFLOW_SHA}` as const;
    }

    export namespace Shell {
      export const GITHUB_WORKFLOW = `$${Name.GITHUB_WORKFLOW}` as const;
      export const GITHUB_WORKFLOW_REF =
        `$${Name.GITHUB_WORKFLOW_REF}` as const;
      export const GITHUB_WORKFLOW_SHA =
        `$${Name.GITHUB_WORKFLOW_SHA}` as const;
    }
  }

  // ---------------------------------------------------------------------------
  // Workspace and file-based env files
  // ---------------------------------------------------------------------------
  export namespace PathsAndFiles {
    export namespace Name {
      /** Workspace directory for the job */
      export const GITHUB_WORKSPACE = "GITHUB_WORKSPACE" as const;
      /** Path to env file for set-env file command */
      export const GITHUB_ENV = "GITHUB_ENV" as const;
      /** Path to PATH file for add-path */
      export const GITHUB_PATH = "GITHUB_PATH" as const;
      /** Path to output file for step outputs */
      export const GITHUB_OUTPUT = "GITHUB_OUTPUT" as const;
      /** Path to summary file for job summary */
      export const GITHUB_STEP_SUMMARY = "GITHUB_STEP_SUMMARY" as const;
      /** Path to state file for save-state */
      export const GITHUB_STATE = "GITHUB_STATE" as const;
    }

    export namespace Env {
      export const GITHUB_WORKSPACE =
        `env.${Name.GITHUB_WORKSPACE}` as const;
      export const GITHUB_ENV = `env.${Name.GITHUB_ENV}` as const;
      export const GITHUB_PATH = `env.${Name.GITHUB_PATH}` as const;
      export const GITHUB_OUTPUT = `env.${Name.GITHUB_OUTPUT}` as const;
      export const GITHUB_STEP_SUMMARY =
        `env.${Name.GITHUB_STEP_SUMMARY}` as const;
      export const GITHUB_STATE = `env.${Name.GITHUB_STATE}` as const;
    }

    export namespace Shell {
      export const GITHUB_WORKSPACE =
        `$${Name.GITHUB_WORKSPACE}` as const;
      export const GITHUB_ENV = `$${Name.GITHUB_ENV}` as const;
      export const GITHUB_PATH = `$${Name.GITHUB_PATH}` as const;
      export const GITHUB_OUTPUT = `$${Name.GITHUB_OUTPUT}` as const;
      export const GITHUB_STEP_SUMMARY =
        `$${Name.GITHUB_STEP_SUMMARY}` as const;
      export const GITHUB_STATE = `$${Name.GITHUB_STATE}` as const;
    }
  }

  // ---------------------------------------------------------------------------
  // Runner properties
  // ---------------------------------------------------------------------------
  export namespace Runner {
    export namespace Name {
      export const RUNNER_ARCH = "RUNNER_ARCH" as const;
      export const RUNNER_DEBUG = "RUNNER_DEBUG" as const;
      export const RUNNER_ENVIRONMENT = "RUNNER_ENVIRONMENT" as const;
      export const RUNNER_NAME = "RUNNER_NAME" as const;
      export const RUNNER_OS = "RUNNER_OS" as const;
      export const RUNNER_TEMP = "RUNNER_TEMP" as const;
      export const RUNNER_TOOL_CACHE = "RUNNER_TOOL_CACHE" as const;
      export const RUNNER_WORKSPACE = "RUNNER_WORKSPACE" as const;
    }

    export namespace Env {
      export const RUNNER_ARCH = `env.${Name.RUNNER_ARCH}` as const;
      export const RUNNER_DEBUG = `env.${Name.RUNNER_DEBUG}` as const;
      export const RUNNER_ENVIRONMENT =
        `env.${Name.RUNNER_ENVIRONMENT}` as const;
      export const RUNNER_NAME = `env.${Name.RUNNER_NAME}` as const;
      export const RUNNER_OS = `env.${Name.RUNNER_OS}` as const;
      export const RUNNER_TEMP = `env.${Name.RUNNER_TEMP}` as const;
      export const RUNNER_TOOL_CACHE =
        `env.${Name.RUNNER_TOOL_CACHE}` as const;
      export const RUNNER_WORKSPACE =
        `env.${Name.RUNNER_WORKSPACE}` as const;
    }

    export namespace Shell {
      export const RUNNER_ARCH = `$${Name.RUNNER_ARCH}` as const;
      export const RUNNER_DEBUG = `$${Name.RUNNER_DEBUG}` as const;
      export const RUNNER_ENVIRONMENT =
        `$${Name.RUNNER_ENVIRONMENT}` as const;
      export const RUNNER_NAME = `$${Name.RUNNER_NAME}` as const;
      export const RUNNER_OS = `$${Name.RUNNER_OS}` as const;
      export const RUNNER_TEMP = `$${Name.RUNNER_TEMP}` as const;
      export const RUNNER_TOOL_CACHE =
        `$${Name.RUNNER_TOOL_CACHE}` as const;
      export const RUNNER_WORKSPACE =
        `$${Name.RUNNER_WORKSPACE}` as const;
    }
  }

  // ---------------------------------------------------------------------------
  // OIDC token request (id-token: write)
  // ---------------------------------------------------------------------------
  export namespace Oidc {
    export namespace Name {
      export const ACTIONS_ID_TOKEN_REQUEST_URL =
        "ACTIONS_ID_TOKEN_REQUEST_URL" as const;
      export const ACTIONS_ID_TOKEN_REQUEST_TOKEN =
        "ACTIONS_ID_TOKEN_REQUEST_TOKEN" as const;
    }

    export namespace Env {
      export const ACTIONS_ID_TOKEN_REQUEST_URL =
        `env.${Name.ACTIONS_ID_TOKEN_REQUEST_URL}` as const;
      export const ACTIONS_ID_TOKEN_REQUEST_TOKEN =
        `env.${Name.ACTIONS_ID_TOKEN_REQUEST_TOKEN}` as const;
    }

    export namespace Shell {
      export const ACTIONS_ID_TOKEN_REQUEST_URL =
        `$${Name.ACTIONS_ID_TOKEN_REQUEST_URL}` as const;
      export const ACTIONS_ID_TOKEN_REQUEST_TOKEN =
        `$${Name.ACTIONS_ID_TOKEN_REQUEST_TOKEN}` as const;
    }
  }

  // ---------------------------------------------------------------------------
  // Actions runtime / cache / results service
  // ---------------------------------------------------------------------------
  export namespace RuntimeCache {
    export namespace Name {
      export const ACTIONS_RUNTIME_URL = "ACTIONS_RUNTIME_URL" as const;
      export const ACTIONS_RUNTIME_TOKEN = "ACTIONS_RUNTIME_TOKEN" as const;
      export const ACTIONS_CACHE_URL = "ACTIONS_CACHE_URL" as const;
      export const ACTIONS_RESULTS_URL = "ACTIONS_RESULTS_URL" as const;
    }

    export namespace Env {
      export const ACTIONS_RUNTIME_URL =
        `env.${Name.ACTIONS_RUNTIME_URL}` as const;
      export const ACTIONS_RUNTIME_TOKEN =
        `env.${Name.ACTIONS_RUNTIME_TOKEN}` as const;
      export const ACTIONS_CACHE_URL =
        `env.${Name.ACTIONS_CACHE_URL}` as const;
      export const ACTIONS_RESULTS_URL =
        `env.${Name.ACTIONS_RESULTS_URL}` as const;
    }

    export namespace Shell {
      export const ACTIONS_RUNTIME_URL =
        `$${Name.ACTIONS_RUNTIME_URL}` as const;
      export const ACTIONS_RUNTIME_TOKEN =
        `$${Name.ACTIONS_RUNTIME_TOKEN}` as const;
      export const ACTIONS_CACHE_URL =
        `$${Name.ACTIONS_CACHE_URL}` as const;
      export const ACTIONS_RESULTS_URL =
        `$${Name.ACTIONS_RESULTS_URL}` as const;
    }
  }
}
