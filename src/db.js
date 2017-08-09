import mysql from 'promise-mysql';
import { database } from './config.json';

export default mysql.createConnection(database);
