const dbConnection = require("./mongoConnections");

//This allows one reference to each collection
const getCollectionFn = collection => {
    let _col = undefined;
  
    return async () => {
      if (!_col) {
        const db = await dbConnection();
        _col = await db.collection(collection);
      }
  
      return _col;
    };
  };
  

  module.exports = {
    todoItems : getCollectionFn("todoItems")
  }