const { DataTypes,Sequelize } = require("sequelize");
const db = require('../dbConfig');

module.exports = {
    Contact : db.conexion.define('contacto',{
			nickname: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			email:{
				type: DataTypes.STRING,	
				allowNull: true,
			},
			avatar:{
				type:DataTypes.TEXT,
				allowNull:true
			},
			phone:{
				type:DataTypes.TEXT,
				allowNull:true
			}
		}),
}