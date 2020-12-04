const { DataTypes } = require('sequelize');
const db = require('../dbConfig');

 const Account = db.conexion.define('account', {
    balanceArs:{
      type: DataTypes.BIGINT,
      allowNull: true,
      default: 0,
    },
    balanceUsd:{
        type: DataTypes.BIGINT,
        allowNull: true,
        default: 0,
      },
    cvu: {
        type: DataTypes.TEXT,
        allowNull: true, 
    },
    code:{
        type: DataTypes.STRING,
        allowNull: true
    },
    currency:{
        type: DataTypes.ENUM('usd','ars'),
        defaultValue: 'ars'
    },
    verified:{
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue:false
    }
  
})
module.exports={
    Account
}
 