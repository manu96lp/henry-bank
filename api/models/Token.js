const { DataTypes } = require('sequelize');
const db = require('../dbConfig');

module.exports = {
    Token :  db.conexion.define('token',{
        pin:{
            type:DataTypes.INTEGER
        },
    })
}