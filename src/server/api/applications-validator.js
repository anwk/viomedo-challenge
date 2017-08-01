/* eslint-disable no-confusing-arrow */
export const errorMessages = {
  gender: 'Must be male of female',
  first: 'Should contain at least 3 letters',
  firstname: 'Should contain at least 3 letters',
  lastname: 'Should contain at least 3 letters',
  email: 'Incorrect email address',
  phone: 'Incorrect phone number',
  age: 'Value must be between 1-99',
  zip: 'Should contain 3 up to 5 numbers',
  termsAccepted: 'Should contain at least 10 symbols',
};

export const isGender = value => ['male', 'female'].indexOf(value) > -1;
export const isPhone = value =>
  /^\s*(?:\+?(\d{1,3}))?[- (]*(\d{3})[- )]*(\d{3})[- ]*(\d{4})(?: *[x/#]{1}(\d+))?\s*$/.test(value);

export default (req, res, next) => {
  if (['POST', 'PUT', 'PATCH'].indexOf(req.method) < 0) return next();
  req.checkBody('gender', errorMessages.gender).isGender();
  req.checkBody('firstname', errorMessages.firstname).isLength({ min: 3 });
  req.checkBody('lastname', errorMessages.lastname).isLength({ min: 3 });
  req.checkBody('email', errorMessages.email).isEmail();
  req.checkBody('phone', errorMessages.phone).isPhone();
  req.checkBody('age', errorMessages.age).isInt({ min: 1, max: 99 });
  req.checkBody('zip', errorMessages.zip).isLength({ min: 3, max: 5 });
  req.checkBody('termsAccepted', errorMessages.termsAccepted).isLength({ min: 10 });

  let errors = req.validationErrors();
  if (errors) {
    errors = errors.map(err => ({ msg: err.msg, param: err.param }));
    res.statusCode = 400;
    return res.json({ errors });
  }
  return next();
};
