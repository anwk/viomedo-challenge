import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import middleware from './middleware/index';
import api from './api/index';
import { isGender, isPhone } from './api/applications-validator';
import config from './config.json';

const initialize = (db) => {
  const app = express();
  app.server = http.createServer(app);

  // logger
  app.use(morgan('dev'));

  // 3rd party middleware
  app.use(cors({
    exposedHeaders: config.corsHeaders,
  }));

  // Validator
  app.use(expressValidator({
    customValidators: {
      isGender,
      isPhone,
    },
  }));

  app.use(bodyParser.json({
    limit: config.bodyLimit,
  }));

  // internal middleware
  app.use(middleware({ config, db }));
  // api router
  app.use('/api', api({ config, db }));

  return app;
};

export default initialize;
