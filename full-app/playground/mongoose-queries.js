const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// let id = '5bfa7ed002609610110e25df0';
//
// if (!ObjectID.isValid(id)){
//   return console.log('Id not valid');
// }

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos);
// })
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   if(!todo) {
//     return console.log('Todo not found');
//   }
//   console.log('Todo', todo);
// })

// Todo.findById(id).then((todo) => {
//   if(!todo) {
//     return console.log('Id not found');
//   }
//   console.log('Todo By id', todo);
// }).catch((e) => console.log(e));

let id = '5bf5b62c116bb67001543f29';

User.findById(id).then((user) => {
  if(!user) return console.log('User not found');
  console.log('User', user);
}, (e) => console.log(e));
