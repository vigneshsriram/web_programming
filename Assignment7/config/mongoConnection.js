const MongoClient = require("mongodb").MongoClient;;

const mongoConfig=  {
        //serverUrl: "mongodb://localhost:27017/",
        serverUrl: "mongodb://root:LCl67MkFgRqV@18.208.219.105:27017/",
        database: "uptick_news_database"
    }



let _connection = undefined
let db = undefined;

module.exports = async () => {
    if (!_connection) {
      _connection = await MongoClient.connect(mongoConfig.serverUrl);
      _db = await _connection.db(mongoConfig.database);
    }
  
    return _db;
  };