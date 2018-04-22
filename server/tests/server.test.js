const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
  _id: new ObjectID(),
  text: 'First Test todo'
},{
  _id: new ObjectID(),
  text: 'Second Test todo'
}]
beforeEach((done) => {
  Todo.remove({}).then(()=> {
    return Todo.insertMany(todos);
  }).then(()=> done());
});

describe(`POST /todos`, () => {
  it(`should create a new todo`,(done) => {
    var text = 'Test for POST /todos';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((response) => {
        expect(response.body.text).toBe(text);
      })
      .end((error, response) => {
        if (error){
          return done(error);
        }
        Todo.find().then((todos) => {
          expect(todos.length).toBe(3);
          expect(todos[2].text).toBe(text);
          done();
        }).catch((e)=>done(e));
      });
  });
  it('should not create a todo with invalid data',(done) => {
    request(app)
    .post('/todos')
    .send({})
    .expect(400)
    .end((error,response) => {
      if(error){
        return done(error);
      }
      Todo.find().then((todos) => {
        expect(todos.length).toBe(2);
        done();
      }).catch((e)=>{
        done(e)
      });
    });
  });
});

describe('GET /todos', ()=> {
  it('should return all todos',(done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((response) =>{
        expect(response.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('should return todo doc',(done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((result) => {
        expect(result.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('should return a 404 on an invalid _id',(done) => {
    request(app)
      .get(`/todos/123456789`)
      .expect(404)
      .end(done);
  });

  it(`should return 404 if ID is not in documents`,(done) => {
    const hexID = new ObjectID().toHexString() ;
    request(app)
      .get(`/todos/${hexID}`)
      .expect(404)
      .end(done);
  });
});

describe('DELETE /todos/:id',() => {
  it('should remove todo',(done) => {
    var hexID = todos[1]._id.toHexString() ;

    request(app)
      .delete(`/todos/${hexID}`)
      .expect(200)
      .expect((response) => {
        expect(response.body.todo._id).toBe(hexID);
      })
      .end((error,response) => {
        if(error){
          return done(error);
        }
        Todo.findById(hexID).then((todo) => {
          expect(todo).toNotExist();
          done();
        }).catch((e) => {
          done(e);
        });
      });
  });
  it('should return 404 if todo not found',(done) => {
    const hexID = new ObjectID().toHexString() ;
    request(app)
      .delete(`/todos/${hexID}`)
      .expect(404)
      .end(done);

  });
  it('should return 404 if object id is invalid', (done) => {
    request(app)
      .delete(`/todos/123456789`)
      .expect(404)
      .end(done);
  });
});
