module.exports = class UserRepository {

  constructor(model) {
    this.model = model;
  }

  create(user) {
    return new Promise((resolve, reject) => {
      this.model.create(user);
      resolve(user);
    });
  }
  
  update(user) {
    return new Promise((resolve, reject) => {
      this.model.update(user,{where:{id:user.id}});
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
  
  getById(id) {
    return new Promise((resolve, reject) => {
      this.model.findByPk(id).then(user => {
        resolve(user);
      })
    });
  }

  getAll() {
    return new Promise((resolve, reject) => {
      let users = this.model.findAll();
      resolve(users);
    });
  }

  del(id) {
    return new Promise((resolve, reject) => {
       this.model.destroy({ where: { id: id } });
      resolve();
    });
  }
}
