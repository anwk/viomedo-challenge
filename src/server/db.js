import mysql from 'promise-mysql';

const options = {
  host: 'localhost',
  user: 'root',
  password: 'mysql',
  database: 'viomedo',
};

const connection = mysql.createConnection(options).then((conn) => {
  console.log(`Successfully connected to "${options.database}" database`);
  return conn;
}).catch((err) => {
  console.error('Database connection error', err);
});

export default connection;
