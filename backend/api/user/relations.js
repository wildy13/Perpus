/* eslint-disable linebreak-style */
const User = require('./model');
const Role = require('../role/model');

User.hasOne(Role, { foreignKey: 'id', sourceKey: 'roleId' });
Role.belongsTo(User, { foreignKey: 'id' });

module.exports = {
  User, Role,
};
