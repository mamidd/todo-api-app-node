// const MongoClient =  require('mongodb').MongoClient;
const {MongoClient, ObjectID} =  require('mongodb'); //usando il destructuring di es6

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }

  console.log('Connected to MongoDB server');
  let db = client.db('TodoApp');

  // db.collection('Todos').find().toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch todos', err);
  // });

  // db.collection('Todos').find({
  //   _id: new ObjectID('5bf1917a882fd895ac8ff448')
  // }).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch todos', err);
  // });

  // db.collection('Todos').find().count().then((count) => {
  //   console.log(`Todos count: ${count}`);
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch todos', err);
  // });

  db.collection('Users').find({name: 'Mario'}).count().then((count) => {
    console.log(`Todos count: ${count}`);
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('Unable to fetch todos', err);
  });

  client.close();
});
