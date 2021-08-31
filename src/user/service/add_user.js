module.exports = (repository) => {
  async function execute(name, email, password, image) {
    return repository.getByEmail(email)
      .then((user) => {
        return new Promise((resolve, reject) => {
          if (!(name && email && password)) {
            reject(new Error('validation failed'));
            return;
          }
          if (user) {
            reject(new Error('Email Exists'));
            return;
          }
          
          resolve({name, email, password, image});
        })
          .then(user => {
            return repository.create(user);
          })
          .then((user) => {
            return Promise.resolve(user);
          })
      })

  }
  return { execute }
}
