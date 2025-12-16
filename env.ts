import type {ConnectOptions} from 'surrealdb';

export const ENDPOINT = 'ws://localhost:8000';

export const CONNECTION_OPTIONS: ConnectOptions = {
    namespace: 'name',
    database: 'data',
    auth: {
        username: 'root',
        password: 'root',
    }
};

export const TABLE_DEFINITION = `
    DEFINE TABLE test_table TYPE NORMAL SCHEMAFULL PERMISSIONS FULL;
    DEFINE FIELD string ON test_table TYPE string PERMISSIONS FULL;
`;