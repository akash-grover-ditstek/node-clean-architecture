module.exports = class UserRepository {

  constructor(model) {
    this.model = model;
  }

  create(user){
    return new Promise((resolve, reject) => {
      this.model.create(user);
      resolve(user);
    });
  }

  getByEmail(email) {
    return new Promise((resolve, reject) => {
      this.model.findAll({ where: { email: email } }).then(user => {
        resolve(user[0]);
      })
    });
  }

  getAll() {
    return new Promise((resolve, reject) => {
      let users = this.model.findAll();
      resolve(users);
    });
  }
}
