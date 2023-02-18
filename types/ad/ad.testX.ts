import { AdRecord } from "../../records/ad.record";

let ad: AdRecord;

// beforeAll( () => {
//     ad = newAdRecord()
// });

test('Test2', () => {
    const ad5 = new AdRecord({
        id: 'dfdfd',
        name: 'Test Name',
        description: 'blah',
        url: 'https://megak.pl',
        price: 0,
        lat: 9,
        lon: 9,
    });

    expect(ad5.name).toBe('Test Name');
})