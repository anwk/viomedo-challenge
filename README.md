# Viomedo application server 

REST API for handle trial application data for a specific clinical trial.

Application uses mysql. You need to have installed mysql.

## Endpoints

#### Application Resources

GET /api/applications - return list of all applications

GET /api/applications/:id - return application by given id

POST /api/applications/:id - create application

PUT /api/applications/:id - update application
 
DELETE /api/applications/:id - delete application
 

## Get Started
**Clone:**
```bash
$ git clone https://anwk/viomedo-challenge-server
```

**Install:**
```bash
$ cd viomedo-challenge-server
$ npm install
```

**Run for project:**

Before run project you to create 'viomedo' database.
From the app root directory run: 

```bash
    mysql -uroot -p < ./src/database.sql
```

It will ask for mysql 'root' user password and create 'viomedo' with applications table. 
Use ./src/server/config.json file to configure connection for app. 


```bash
$ npm start
```

**Run test:**
```bash
$ npm test
```