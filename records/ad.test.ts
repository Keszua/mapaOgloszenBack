import { AdEntity } from "../types";
import { pool } from "../utils/db";
import { AdRecord } from "./ad.record"

afterAll( async () => {
    await pool.end();
});

describe('Tests for AdRecord.getOne' , () => { 
    test('return data from databases for one entry', async () => {
        const ad = await AdRecord.getOne('abcIDabc');

        expect(ad).toBeDefined();
        expect(ad.id).toBe('abcIDabc');  // nazwa musi być taka jak daliśmy w bazie
        expect(ad.name).toBe('testowaNazwa');
        expect(ad.description).toBe('Testowy opis');
        expect(ad.url).toBe('http://megak.pl');
        //expect(ad.lat).toBe(51.4097);
        //expect(ad.lon).toBe(21.1301);
    });

    test('returns null from database for unexisting entry', async () => {
        const ad = await AdRecord.getOne('---');

        expect(ad).toBeNull();
    });
});

describe('Tests for AdRecord.findAll' , () => { 

    test('returns array of found entries', async () => {
        const ad = await AdRecord.findAll('');

        expect(ad).not.toEqual([]);
        expect(ad[0].id).toBeDefined();
    });

    test('returns array of found entries when searching for "a"', async () => {
        const ad = await AdRecord.findAll('a');

        expect(ad).not.toEqual([]);
        expect(ad[0].id).toBeDefined();
    });

    test('returns empty array when searching for something does not exist', async () => {
        const ad = await AdRecord.findAll('---------');

        expect(ad).toEqual([]);
    });

    test('returns small amount of data', async () => {
        const ads = await AdRecord.findAll('');

        expect((ads[0] as AdEntity).price).toBeUndefined();
        expect((ads[0] as AdEntity).description).toBeUndefined();
    });
});

describe('Tests for AdRecord.insert' , () => { 

    const defaultObj = {
        name: '[Test--123]',
        description: 'blah',
        url: 'https://megak.pl',
        price: 0,
        lat: 9,
        lon: 9,
    }

    test('returns new UUID', async () => {
        const ad = new AdRecord(defaultObj);
        await ad.insert();

        expect(ad.id).toBeDefined();
        expect(typeof ad.id).toBe('string');
    });

    test('inserts data to database ', async () => {
        const ad = new AdRecord(defaultObj);
        await ad.insert();

        const foundAd = await AdRecord.getOne(ad.id);

        expect(foundAd).toBeDefined();
        expect(foundAd).not.toBeNull();
        expect(foundAd.id).toBe(ad.id);
    });
});
