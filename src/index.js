import winston from 'winston';
import config from './config.json';
import db from './db';
import init from './app';

db.then((conn) => {
  const app = init({ config, conn });
  app.server.listen(process.env.PORT || config.port, () => {
    winston.info(`Started on port ${app.server.address().port}`);
  });
}).catch((error) => {
  const { database, host } = config.database;
    winston.error(`Can not connect to ${database} database on host ${host}... ${error}`);
});
