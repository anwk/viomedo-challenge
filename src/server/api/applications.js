import resource from 'resource-router-middleware';

export default ({ model }) => resource({
  /** Property name to store preloaded entity on `request`. */
  id: 'id',

  /** GET / - List all entities */
  index(req, res) {
    model.findAll()
      .then(response => res.json(response));
  },

  /** GET /:id - Return a given entity */
  read({ params }, res) {
    model.find(params.id)
      .then((entity) => {
        if (entity) {
          return res.json(entity);
        }
        res.status(404);
        return res.json({ errors: ['Application was not found'] });
      });
  },

  /** POST / - Create a new entity */
  create(req, res, callback) {
    const { body, protocol } = req;
    const host = req.get('host');
    model.create(body)
      .then((entity) => {
        res.status(201);
        res.links({
          self: `${protocol}://${host}/api/applications/${entity.id}`,
        });
        return res.json(entity);
      }).catch(callback);
  },

  /** PUT /:id - Update a given entity */
  update({ body }, res, callback) {
    model.update(body)
      .then((entity) => {
        return res.json(entity);
      }).catch(callback);
  },

  /** DELETE /:id - Delete a given entity */
  delete({ params }, res) {
    model.remove(params.id)
      .then(() => res.end());
  },
});
