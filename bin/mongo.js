const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/reddit";
const dbName = "reddit";

class Mongo {
  constructor() {
    if (!Mongo.instance) {
      MongoClient.connect(url,
      { useNewUrlParser: true, useUnifiedTopology: true},
    (err,client) => {
      if (err) throw err;
      Mongo.instance = client.db(dbName);
      console.log('mongo connectd');
    });
    }
  }
  getInstance(){
    return Mongo.instance;
  }
}

module.exports = new Mongo();
