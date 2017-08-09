class Application {
  constructor() {
    this.promise = Promise;
  }

  findAll() {
    return this.promise.resolve([]);
  }

  find(id) {
    if (id === '1') {
      return this.promise.resolve({ id });
    }
    return this.promise.resolve();
  }

  create(entity) {
    return this.promise.resolve({ ...entity, id: '1' });
  }

  update(entity) {
    return this.promise.resolve(entity);
  }

  remove() {
    return this.promise.resolve();
  }
}

export default Application;
