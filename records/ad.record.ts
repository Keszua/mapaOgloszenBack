import { FieldPacket } from "mysql2";
import { AdEntity, NewAdEntity } from "../types";
import { pool } from "../utils/db";
import { ValidationError } from "../utils/errors";


type AdRecordResults = [AdEntity[], FieldPacket[]];

export class AdRecord implements AdEntity {
    public id: string;
    public name: string;
    public description: string;
    public price: number;
    public url: string;
    public lat: number;
    public lon: number;

    constructor(obj: NewAdEntity) {
        if (!obj.name || obj.name.length > 100) {
            throw new ValidationError('Nazwa ogłoszenia nie może być pusta, ani przekraczać 100 znaków');
        }
    
        if (obj.description.length > 1000) {
            throw new ValidationError('Treść ogłoszenia nie moze być większa niż 1000 znaków');
        }

        if (obj.price < 0 || obj.price > 9999999) {
            throw new ValidationError('Cena nie może być mniejsza niż 0 lub większa niż 9 999 999');
        }

        //TODO: Check if URL ids valid
        if (!obj.url || obj.url.length > 100) {
            throw new ValidationError('Adres ogłoszenia nie może być pusty ani przekraczać 100 znaków');
        }

        if (typeof obj.lat !== 'number' ||  typeof obj.lon !== 'number') {
            throw new ValidationError('Nie można zlokalizować ogłoszenia');
        }
     
        this.id = obj.id;
        this.name = obj.name;
        this.description = obj.description;
        this.price = obj.price;
        this.url = obj.url;
        this.lat = obj.lat;
        this.lon = obj.lon;
    }

    static async getOne(id: string): Promise<AdRecord | null> {

        const [result] = await pool.execute("SELECT * FROM `ads` WHERE id = :id", {
            id,
        }) as AdRecordResults;

        return result.length === 0 ? null : new AdRecord(result[0]);
    }

}