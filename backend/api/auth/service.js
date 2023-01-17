const jwt = require('jsonwebtoken');
const { expressjwt } = require('express-jwt');
const {
  config: { secret, userRoles },
} = require('../../config');
const User = require('../user/model');

const verifyToken = expressjwt({
  secret: secret.session,
  algorithms: ['HS256'],
  credentialsRequired: false,
  getToken: function fromHeaderOrQuerystring(req) {
    if (
      req.headers.authorization
      && req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
      return req.headers.authorization.split(' ')[1];
    }
    if (req.query && req.query.token) {
      return req.query.token;
    }
    return null;
  },
});

const signToken = (
  id,
  username,
  roleId,
  email,
) => jwt.sign(
  {
    id, username, roleId, email
  },
  secret.session,
  {
    expiresIn: 60 * 60 * 5,
  },
);

const isAuthenticated = () => async (req, res, next) => {
  if (!req.auth) {
    res.status(401).json('Access Denied / Forbidden');
  } else {
    const user = await User.findOne({
      attributes: [
        'id',
        'username',
        'roleId',
        'email',
      ],
      where: { username: req.auth.username },
    });

    if (!user) {
      res.status(401).json('Access Denied / Forbidden');
    }

    next();
  }
};

const hasRole = (roleId) => async (req, res, next) => {
  if (!req.auth) {
    res.status(401).json('Access Denied / Forbidden');
  } else if (userRoles.indexOf(roleId) <= userRoles.indexOf(req.auth.roleId)) {
    next();
  } else {
    res.status(401).json('Access Denied / Forbidden');
  }
};

const isAdmin = () => async (req, res, next) => {
  if (!req.auth) {
    res.status(401).json('Access Denied / Forbidden');
  } else if (req.auth.roleId === 2) {
    next();
  } else {
    res.status(401).json('Access Denied / Forbidden');
  }
};

module.exports = {
  verifyToken, signToken, isAuthenticated, hasRole, isAdmin,
};
