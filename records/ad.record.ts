import { FieldPacket } from "mysql2";
import { AdEntity, NewAdEntity, SimpleAdEntity } from "../types";
import { pool } from "../utils/db";
import { ValidationError } from "../utils/errors";
import {v4 as uuid} from 'uuid';

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
    };

    static async findAll(name: string): Promise<SimpleAdEntity[]> {

        const [results] = await pool.execute("SELECT * FROM `ads` WHERE `name` LIKE :search", {
            search: `%${name}%`,
        }) as AdRecordResults;

        return results.map( result => {
            const {
                id, lat, lon,
            } = result;

            return {
                id, lat, lon,
            };
        });
    
    };

    async insert(): Promise<void> {
        if(!this.id) {
            this.id = uuid();
        } else {
            throw new Error('Cannot insert something that is alredy inserted!');
        }

        const [result] = await pool.execute("INSERT INTO `ads` (`id`, `name`, `description`, `price`, `url`, `lat`, `lon`) VALUE (:id, :name, :description, :price, :url, :lat, :lon)", this);
    };

}

/*
CREATE TABLE `ads` (
	`id` VARCHAR(36) NOT NULL,
	`name` VARCHAR(100) NOT NULL,
	`description` VARCHAR(1000) NOT NULL,
	`price` DECIMAL(9,2) NOT NULL,
	`url` VARCHAR(100) NOT NULL,
	`lat` DECIMAL(10,7) NOT NULL,
	`lon` DECIMAL(10,7) NOT NULL
)
COLLATE='utf8mb4_unicode_ci';


*/