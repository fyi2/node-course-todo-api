const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
  text: 'First Test todo'
},{
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
