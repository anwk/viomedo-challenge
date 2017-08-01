const tableName = 'applications';

class Application {
  constructor(db) {
    this.db = db;
  }

  findAll() {
    return this.db.query(`SELECT * FROM ${tableName}`);
  }

  find(id) {
    return this.db.query(`SELECT * FROM ${tableName} WHERE id=${id}`)
      .then(([item]) => item);
  }

  create(entity) {
    return this.db.query(`INSERT INTO ${tableName} set ?`, entity)
      .then(({ insertId }) => {
        return this.find(insertId);
      });
  }

  update(entity) {
    return this.db.query(`UPDATE ${tableName} set ?`, entity);
  }

  remove(id) {
    return this.db.query(`DELETE FROM ${tableName} WHERE id=${id}`);
  }
}

export default Application;
