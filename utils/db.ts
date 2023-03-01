import {createPool} from 'mysql2/promise';
import { config } from '../config/config';

export const pool = createPool( { // multi połączenie.
	host: config.dbHost,
    port: config.dbPort,	      // na lokalnym Xampie
	user: config.dbUser,
	password: config.dbPassword,
	database: config.dbDatabase ,
    decimalNumbers: true,         //liczby jako liczby, ale tracimy dokładność albo bigNumberStrings: flase  (??chyba)
	//multipleStatments: true,
	namedPlaceholders: true,      // aby działało przekazywanie argumentów z obiektu
});

// przy tworzeniu bazy, pamiętać o kodowaniu COLLATE = 'utf8mb4_unicode_ci';
