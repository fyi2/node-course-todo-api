const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose') ;
var {Todo} = require('./models/todo') ;
var {User} = require('./models/user')

var app = express() ;
const port = process.env.PORT || 3000 ;


app.use(bodyParser.json());

app.post('/todos',(request, response) => {
  var todo = new Todo({
    text: request.body.text
  });
  todo.save().then((doc)=> {
    response.send(doc);
  }, (e) => {

    response.status(400).send(e);
  })
});

app.get('/todos', (request,response) => {
  Todo.find().then((todos)=>{
    response.send({todos});
  },(e)=>{
    response.status(400).send(e);
  });
});

app.get('/todos/:id',(request, response) => {
  var id = request.params.id ;
  if (!ObjectID.isValid(id)){
    return response.status(404).send() ;
  }
  Todo.findById(id).then((todo) => {
    if(!todo){
      return response.status(404).send();
    }
    response.status(200).send({todo});
  }).catch((e) => {
    response.status(400).send();
  });
});

app.listen(port, () => {
  console.log(`Server started on port ${port});
});

module.exports = {
  app : app
}
