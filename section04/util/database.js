const { MongoClient } = require('mongodb');

let _db;

function mongoConnect(onConnect) {

  // create mongodb client
  const uri = 'mongodb+srv://darcee:BtTpDnbxkCEPV9Ul@cluster0.lkgjm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
  const client = new MongoClient(uri);

  // connect and call onConnect callback if successful
  client.connect()
    .then(result => {
      console.log('Connected!');
      _db = client.db();
      onConnect(result);
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
}

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
