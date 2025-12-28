const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const bcrypt = require('bcryptjs');

//name, email, password
const User = sequelize.define('user', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true}
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'users',
    timestamps: true,
   
     }
    );

module.exports = User;