let env = process.env.NODE_ENV || 'development';

//Heroku set NODE_ENV variable to 'production'
//Heroku setta tutte le variabili che servono direttamente nel process.env

if (env === 'development' || env === 'test'){
  let config = require('./config.json');
  let envConfig = config[env];

  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key];
  })
}
