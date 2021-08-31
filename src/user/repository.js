module.exports = class UserRepository {

    constructor(database){
      this.database = database;
    }
  
    create(user){
      return new Promise((resolve, reject) => {
        this.database(user).save();
        resolve(user);
      });
    }
  
    getByEmail(email){
      return new Promise((resolve, reject) => {
        this.database.find({email: email}).then(user => {
          resolve(user[0]);
        })
      });
    }
  
    getAll(){
      return new Promise((resolve, reject) => {
        let users = this.database.find();
        resolve(users);
      });
    }
  }
  