import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import middleware from './middleware';
import api from './api/index';

const initialize = ({ conn, config }) => {
  const app = express();
  app.server = http.createServer(app);

  // logger
  app.use(morgan('dev'));

  // 3rd party middleware
  app.use(cors({
    exposedHeaders: config.corsHeaders,
  }));

  app.use(bodyParser.json({
    limit: config.bodyLimit,
  }));

  // internal middleware
  app.use(middleware({ config, conn }));
  // api router
  app.use('/api', api({ config, conn }));

  // Error handler middleware
  app.use((errors, req, res, next) => {
    if (errors) {
      res.status(500);
      return res.json({ errors });
    }
    return next();
  });

  return app;
};

export default initialize;
