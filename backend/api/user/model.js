const { DataTypes } = require('sequelize');
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sequelize } = require('../../config/index');
const  Role  = require('../role/model');

const User = sequelize.define(
  'user',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },

    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: ' This username is already taken',
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        const salt = genSaltSync(10);
        this.setDataValue('password', hashSync(value, salt));
      },
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },

    nisn: {
      type: DataTypes.INTEGER,
      unique: {
        args: true,
        msg: 'This NISN is already in database'
      }
    },

    image: {
      type: DataTypes.STRING,
    },

    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: Role,
        key: 'id'
      }
    },
  },
  {
    tableName: 'tblUser',
  },
);

User.prototype.authenticate = function compare(password) {
  const pwgen = compareSync(password, this.password);

  if (pwgen) {
    return true;
  }
  return false;
};

module.exports = User;
