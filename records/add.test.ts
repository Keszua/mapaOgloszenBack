import { AdRecord } from "./ad.record"

test('AdRecords return data from databases for one entry', async () => {
    const ad = await AdRecord.getOne('abcIDabc');

    console.log("!test AD", ad);

    expect(ad).toBeDefined();
    expect(ad.id).toBe('abcIDabc');  // nazwa musi być taka jak daliśmy w bazie
    expect(ad.name).toBe('testowaNazwa');
    expect(ad.description).toBe('Testowy opis');
    expect(ad.url).toBe('http://megak.pl');
    //expect(ad.lat).toBe(51.4097);
    //expect(ad.lon).toBe(21.1301);
});

test('AdRecord returns null from database for unexisting entry', async () => {
    const ad = await AdRecord.getOne('---');

    expect(ad).toBeNull();
});