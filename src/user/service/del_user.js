module.exports = (repository) => {
  async function execute(id){
    const users = await repository.del(id);
    return new Promise((resolve, reject) => {
      resolve({message:"User Deleted"});
    });
  }
  return {execute}
}
