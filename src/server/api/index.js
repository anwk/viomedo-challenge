import { Router } from 'express';
import applicationsValidator from './applications-validator';
import applications from './applications';
import { version } from '../../../package.json';
import Application from '../models/application';

export default ({ config, db }) => {
  const api = Router();

  // mount the application resource
  const model = new Application(db);
  api.use('/applications', applicationsValidator, applications({ config, model }));

  // perhaps expose some API metadata at the root
  api.get('/', (req, res) => {
    res.json({ version });
  });

  return api;
};
