let env = process.env.NODE_ENV || 'development';

//Heroku set NODE_ENV variable to 'production'

if (env === 'development' || env === 'test'){
  let config = require('./config.json');
  let envConfig = config[env];

  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key];
  })
}
