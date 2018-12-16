// const MongoClient =  require('mongodb').MongoClient;
const {MongoClient, ObjectID} =  require('mongodb'); //usando il destructuring di es6

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }

  console.log('Connected to MongoDB server');
  let db = client.db('TodoApp');

  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert todo', err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  // db.collection('Users').insertOne({
  //     name: 'Mario',
  //     age: 28,
  //     location: 'Turin'
  // }, (err, result) => {
  //     if (err) {
  //       return console.log('Unable to insert user', err);
  //     }
  //     console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  db.collection('Users').insertOne({
      name: 'Mario',
      age: 28,
      location: 'Turin'
  }, (err, result) => {
      if (err) {
        return console.log('Unable to insert user', err);
      }
      console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
  });

  client.close();
});
