import { Router } from 'express';
import expressValidator from 'express-validator';
import { isPhone, isGender } from '../api/applications-validator';

export default (/* { config, db } */) => {
  const routes = Router();
  routes.use(expressValidator({
    customValidators: {
      isGender,
      isPhone,
    },
  }));
  return routes;
};
