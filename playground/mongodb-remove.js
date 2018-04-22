//const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose.js');
const {Todo} = require(`./../server/models/todo`);
const {User} = require(`./../server/models/user`);

Todo.remove({}).then((result)=> {
  console.log(result);
})

// Todo.findOneAndRemove
// Todo.findByIdAndRemove
