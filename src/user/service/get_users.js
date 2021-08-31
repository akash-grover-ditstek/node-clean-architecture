module.exports = (repository) => {
  async function execute(){
    const users = await repository.getAll();
    return new Promise((resolve, reject) => {
      resolve(users);
    });
  }
  return {execute}
}
