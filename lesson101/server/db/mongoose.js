let mongoose = require('mongoose');
const mongodbURI = process.env.MONGODB_URI;

mongoose.Promise = global.Promise;
mongoose.connect(mongodbURI);

module.exports = {mongoose}
