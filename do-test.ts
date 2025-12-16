import {Surreal} from 'surrealdb';
import {CONNECTION_OPTIONS, ENDPOINT} from './env.ts';

function generateQuery() {
    return `
        CREATE test_table CONTENT {
            string: <string>rand::uuid(),
        };
    `
}

export async function doTest(workers: number, quantity: number) {
    let errors: any[] = [];
    let connections: Surreal[] = [];
    
    for (let i = 0; i < workers; i++) {
        let connection = new Surreal();
        connections.push(connection);
        await connection.connect(ENDPOINT, CONNECTION_OPTIONS);
    }
    
    await Promise.all(connections.map(async connection => {
        for (let i = 0; i < quantity; i++) {
            try {
                await connection.query(generateQuery());
            } catch (e) {
                errors.push(e);
            }
        }
    }));
    
    return errors
}



