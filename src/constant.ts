export enum ENV {
    dev = 'dev',
    prod = 'prod',
}

export enum DB {
    DB_NAME = 'GENERATIVE',
}

export enum USER_TYPE {
    PROJECT_MANAGER = 'PROJECT_MANAGER',
    TASK_OWNER = 'TASK_OWNER',
    WATCHER = 'WATCHER',
}

export enum PROJECT_STATUS {
    COMPLETED = 'COMPLETED',
    ON_GOING = 'ON_GOING',
    ARCHIVED = 'ARCHIVED',
    DRAFT = 'DRAFT',
}

export enum MODELS {
    PROJECT = 'Project',
    USER = 'User',
    TASK = 'Task',
}

export enum TASK_STATUS {
    TODO = 'TODO',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
    PARKED = 'PARKED',
}
