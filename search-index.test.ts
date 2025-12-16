import {describe, it, expect, beforeAll, afterAll} from 'bun:test';
import {doTest} from './do-test.ts';
import {Surreal} from 'surrealdb';
import {CONNECTION_OPTIONS, ENDPOINT, TABLE_DEFINITION} from './env.ts';


describe('Concurrency Test', () => {
    beforeAll(async () => {
        let surreal = new Surreal();
        await surreal.connect(ENDPOINT, CONNECTION_OPTIONS);
        await surreal.query(TABLE_DEFINITION);
        await surreal.query(`
            DEFINE ANALYZER test_analyzer;
            DEFINE INDEX idx_search ON test_table FIELDS string SEARCH ANALYZER test_analyzer;
        `);
    });
    
    afterAll(async () => {
        let surreal = new Surreal();
        await surreal.connect(ENDPOINT, CONNECTION_OPTIONS);

        await surreal.query(`
            REMOVE TABLE test_table;
            REMOVE ANALYZER test_analyzer;
        `); 
    });
    
    it('1 worker', async () => {
        let errors = await doTest(1, 1000);
        expect(errors.length).toEqual(0);
    });

    it('2 workers', async () => {
        let errors = await doTest(2, 1000);
        expect(errors.length).toEqual(0);
    });

    it('5 workers', async () => {
        let errors = await doTest(5, 1000);
        expect(errors.length).toEqual(0);
    });
});