import config from './config.json';
import db from './db';
import init from './app';

db.then((conn) => {
  const app = init(conn);
  app.server.listen(process.env.PORT || config.port, () => {
    console.log(`Started on port ${app.server.address().port}`);
  });
});
