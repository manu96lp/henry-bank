const { DataTypes } = require('sequelize');
const db = require('../dbConfig');

 const Transaction = db.conexion.define('transaction', {
    title: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    transactionType: {
        type: DataTypes.ENUM(["recharge","transfer","received","debitCard","conversionArs","conversionUsd"]),
        allowNull: true,
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    balanceType:{
        type: DataTypes.ENUM(["positivo","negativo"]),
        allowNull: true,
    },
    refernece: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    currency: {
        type: DataTypes.ENUM(["ARS", "USD"]),
        allowNull: true,
    },
  
})
module.exports={
    Transaction
}
 