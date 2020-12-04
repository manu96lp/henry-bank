const { DataTypes } = require('sequelize');
const {Token} = require("./Token");
const db = require('../dbConfig');


   const User =  db.conexion.define('user',{
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            validated:{
              isEmail: false,
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        username:{
            type:DataTypes.STRING,
            allowNull: true,
        },
        name:{
            type:DataTypes.STRING,
            allowNull: true,
        },
        surname:{
            type:DataTypes.STRING,
            allowNull: true,
        },
        birthday: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        identityType: {
            type: DataTypes.ENUM(["dni", "passport"]),
            allowNull: true,
        },
        identityNumber: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        avatar: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        adress:{
            type:DataTypes.TEXT,
            allowNull:true
        },
        role:{
            type: DataTypes.ENUM('user','admin'),
            defaultValue: 'user'
        },
        verified: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
    })
module.exports={
    User,
    Token
}