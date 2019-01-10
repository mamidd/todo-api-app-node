const {SHA256} = require('crypto-js');
const bcrypt = require('bcryptjs');

// let message = 'I am user number 3';
// let hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);
//
// let data = {
//   id: 4
// }
//
// let token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }
//
// //simulating man in the middle
// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();
//
// let resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
// if(resultHash === token.hash){
//   console.log(`Data was not changed`);
// }else{
//   console.log(`Data was changed. Don't trust!`);
// }


let password = "123abc!";

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log(hash)
  });
})

let hashedPassword = '$2a$10$mw29tEPkoJVX7o63TaiLO.IGL.M1W7l.fPMwiPMSgQgj92nwHfH3G';

bcrypt.compare(password, hashedPassword, (err, res) => {
  if(res){
    console.log('matched')
  }else{
    console.log('not matched')
  }
})
