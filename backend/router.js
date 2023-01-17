const auth = require('./api/auth');
const user = require('./api/user');
const role = require('./api/role');

const router = (app) => {
  app.use('/api/auth', auth);
  app.use('/api/user', user);
  app.use('/api/role', role);
};

module.exports = router;
