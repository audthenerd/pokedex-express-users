
var banana = (app, pool) => {
  const ownerControllerFunctions = require('./controllers/owner')(pool);

  app.get('/users/login', ownerControllerFunctions.login)
  app.post('/users/login', ownerControllerFunctions.loginPost)
};

module.exports = banana;