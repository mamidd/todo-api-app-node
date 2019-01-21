const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//   console.log(result);
// })

Todo.findOneAndRemove({_id: "5c097fc6174b130204857fc8"}).then((doc) => {
  console.log(doc)
})

Todo.findByIdAndRemove("5c097fc6174b130204857fc8").then((doc) => {
  console.log(doc)
})
