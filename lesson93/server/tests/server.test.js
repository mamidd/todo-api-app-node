const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed.js');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', () => {
  it('should creare a new todo', (done) => {
    let text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if(err) return done(err);

        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if(err) return done(err);

        Todo.find().then((todos) => {
          expect(todos.length).toBe(todos.length);
          done();
        }).catch((e) => done(e));
      });
  });
});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(todos.length);
      })
      .end(done);
  });
})

describe('GET /todos/:id', () => {
  it('should return todo doc', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('should return 404 if todo not found', (done) => {
    request(app)
      .get(`/todos/${new ObjectID().toHexString()}`)
      .expect(404)
      .expect('')
      .end(done);
  });

  it('should return 404 for ObjectID not valid', (done) => {
    request(app)
      .get(`/todos/notValidID`)
      .expect(404)
      .expect('')
      .end(done);
  })
})

describe('DELETE /todos/:id', () => {
  it('should remove a todo', (done) => {
    let hexId = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err, res) => {
        if(err) return done(err);

        Todo.findById(hexId).then((todo) => {
          expect(todo).toBeFalsy();
          done();
        }).catch(e => done(e));
      });
  })

  it('should return 404 if todo not found', (done) => {
    request(app)
      .delete(`/todos/${new ObjectID().toHexString()}`)
      .expect(404)
      .expect('')
      .end(done);
  })

  it('should return 404 id ObjectID is not valid', (done) => {
    request(app)
      .delete(`/todos/notValidID`)
      .expect(404)
      .expect('')
      .end(done);
  })
})

describe('PATCH /todos/:id', () => {
  it('should update the todo', (done) => {
    let hexId = todos[0]._id.toHexString();
    let text = 'test patch';
    let completed = true;

    request(app)
      .patch(`/todos/${hexId}`)
      .send({text, completed})
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(true);
        expect(typeof res.body.todo.completedAt).toBe('number');
      })
      .end(done);
  });

  it('should clear completedAt when todo is not completed', (done) => {
    let hexId = todos[1]._id.toHexString();
    let text = 'test patch 2';
    let completed = false;

    request(app)
      .patch(`/todos/${hexId}`)
      .send({text, completed})
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.completedAt).toBeFalsy();
      })
      .end(done);
  });
})

describe('GET /users/me', () => {
  it('should return user if authenticated', (done) => {
    request(app)
      .get('/users/me')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body._id).toBe(users[0]._id.toHexString());
        expect(res.body.email).toBe(users[0].email);
      })
      .end(done);
  });

  it('should return 401 if not authenticated', (done) => {
    request(app)
      .get('/users/me')
      .expect(401)
      // .expect('') --> modo 1 per verificare body vuoto
      .expect((res) => {
        // --> modo 2 per verificare body vuoto
        expect(res.body).toEqual({});
      })
      .end(done);
  });
});

describe('POST /users', () => {
  it('should create a user', (done) => {
    let email = 'test@example.com';
    let password = '123mnb!';

    request(app)
      .post('/users')
      .send({email,password})
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).toBeTruthy();
        expect(res.body._id).toBeTruthy();
        expect(res.body.email).toBe(email);
      })
      .end((err) => {
        if(err){
          return done(err);
        }

        User.findOne({email}).then((user) => {
          expect(user).toBeTruthy();
          expect(user.password).not.toBe(password);
          done();
        })
      });
  });

  it('should return validation errors if request invalid', (done) => {
    let email = 'emailNotValid';
    let password = '123cbn!';
    request(app)
      .post('/users')
      .send({email,password})
      .expect(400)
      .end(done);
  });

  it('should not create user if email in use', (done) => {
    let password = '123cbn!';
    request(app)
      .post('/users')
      .send({email: users[0].email, password})
      .expect(400)
      .end(done);
  });
});
