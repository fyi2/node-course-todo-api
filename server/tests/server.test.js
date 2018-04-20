const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

beforeEach((done) => {
  Todo.remove({}).then(()=> {
    done()
  })
})

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
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
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
        expect(todos.length).toBe(0);
        done();
      }).catch((e)=>{
        done(e)
      });
    });
  });
});
