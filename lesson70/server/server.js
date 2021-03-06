let mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

let Todo = mongoose.model('Todo', {
  text: {
    type: String
  },
  completed: {
    type: Boolean
  },
  completedAt: {
    type: Number
  }
})

// let newTodo = new Todo({
//   text: 'Cook dinner'
// })
//
// newTodo.save().then((doc) => {
//   console.log('Saved todo', doc);
// }, (e) => {
//   console.log('Unable to save todo');
// });

let bisTodo = new Todo({
  text: 'Eat salad',
  completed: false,
  completedAt: Date.now()
});

bisTodo.save().then((doc) => {
  console.log('Saved todo', doc)
}, (e) => {
  console.log('Unable to save todo');
});
