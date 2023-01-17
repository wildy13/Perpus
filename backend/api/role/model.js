const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config');

const Role = sequelize.define(
  'role',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'this role is already in database',
      },
    },
  },
  {
    tableName: 'tblRole',
  },
);

module.exports = Role;
