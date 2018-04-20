//const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, client)=>{
  if(err){
    return console.log(`Unable to connect to MongoDB server`);
  }
  console.log(`Connected to MongoDB server.`);

  const db = client.db('TodoApp');

  db.collection('Todos').find().count().then((count)=>{
    console.log(`To Dos count ${count}`);
  }, (err)=> {
    return console.log(`Unable to fetch the Doc ${err}`);
  });


  //client.close();
});
