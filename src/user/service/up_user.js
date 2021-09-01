const { response } = require("express");

module.exports = (repository) => {
  async function execute(id, name, email, password, image) {
    return repository.getById(id)
      .then((user) => {
        return new Promise((resolve, reject) => {
          if (!user) {
            reject(new Error('User Don\'t Exists'));
            return;
          }

          repository.getByEmail(email).then((old) => {
            if (old && old.id != user.id) {
              reject(new Error('Email exists'))
              return;
            }
            else
              resolve({ id, name, email, password, image })
          })
        })
          .then(user => {
            return repository.update(user);
          })
          .then((user) => {
            return Promise.resolve(user);
          })
      })

  }
  return { execute }
}
