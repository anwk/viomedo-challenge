/* global describe, it, expect, beforeAll */
import request from 'supertest';
import initialize from '../app';
import { errorMessages } from './applications-validator';

jest.mock('../../../package.json', () => ({ version: '1.0.0' }));
jest.mock('../models/application');

const applicationMock = {
  gender: 'male',
  lastname: 'Smith',
  firstname: 'Jack',
  email: 'smith@gmail.com',
  phone: '+37256642890',
  age: 26,
  zip: 12534,
  termsAccepted: 'Some terms....',
};

describe('API', () => {
  let app = null;

  beforeAll(() => {
    app = initialize({ config: { corsHeaders: ['Link'] } });
  });

  it('It should return version of api', () => {
    return request(app).get('/api/').then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.body.version).toBe('1.0.0');
    });
  });
  it('It should return a list of applications', () => {
    return request(app).get('/api/applications/').then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual([]);
    });
  });
  it('It should return application by id', () => {
    return request(app).get('/api/applications/1').then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ id: '1' });
    });
  });
  it('It should response with error if application does not exist', () => {
    return request(app).get('/api/applications/2').then((response) => {
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({ errors: ['Application was not found'] });
    });
  });
  it('It should create application', () => {
    return request(app).post('/api/applications/').send(applicationMock).then((response) => {
      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual({ ...applicationMock, id: '1' });
    });
  });
  it('It should not create application and return errors', () => {
    return request(app).post('/api/applications/')
      .send({ age: 100, zip: 88, email: 'mail', phone: '01', gender: 'no gender' }).then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.body.errors).toEqual([
          {
            param: 'gender',
            msg: errorMessages.gender,
          },
          {
            param: 'firstname',
            msg: errorMessages.firstname,
          },
          {
            param: 'lastname',
            msg: errorMessages.lastname,
          },
          {
            param: 'email',
            msg: errorMessages.email,
          },
          {
            param: 'phone',
            msg: errorMessages.phone,
          },
          {
            param: 'age',
            msg: errorMessages.age,
          },
          {
            param: 'zip',
            msg: errorMessages.zip,
          },
          {
            param: 'termsAccepted',
            msg: errorMessages.termsAccepted,
          },
        ]);
      });
  });
  it('It should update an application', () => {
    return request(app).put('/api/applications/1')
      .send({ ...applicationMock, id: '1', name: 'Stefan' }).then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ ...applicationMock, id: '1', name: 'Stefan' });
      });
  });
  it('It should delete application by id', () => {
    return request(app).delete('/api/applications/1').then((response) => {
      expect(response.statusCode).toBe(200);
    });
  });
});
