//const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, client)=>{
  if(err){
    return console.log(`Unable to connect to MongoDB server`);
  }
  console.log(`Connected to MongoDB server.`);

  const db = client.db('TodoApp');

  db.collwction('Todos').find().toArray().then((docs)=>{
    console.log(`To Dos`);
    console.log(JSON,stringify(docs,undefined,2));
  }, (err)=> {
    return console.log(`Unable to fetch To Dos ${err}`);
  });


    // db.collection('Todos').insertOne({
    //   text:'Something else todo',
    //   completed:false
    // },(error,result)=> {
    //   if(error){
    //     return console.log(`Unable to insert Todo`);
    //   }
    //   console.log(JSON.stringify(result.ops,undefined, 2));
    // });
    //
    //   db.collection('Users').insertOne({
    //     name:'Tony',
    //     age:21,
    //     location:'Boston'
    //   },(error,result)=> {
    //     if(error){
    //       return console.log(`Unable to insert into Users`);
    //     }
    //     console.log(JSON.stringify(result.ops,undefined, 2));
    //   });

  //client.close();
});
