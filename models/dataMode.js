const { sq } = require('../config/dbConfig')
const { DataTypes } = require("sequelize");
const itemModel = require('./itemModel')

const Data = sq.define('data', {
    vrNo: {
        type: DataTypes.NUMBER,
        allowNull: false,
        primaryKey: true
    },
    srNo: {
        type: DataTypes.NUMBER,
        allowNull: false,
        primaryKey: true
    },
    itemCode:{
        type:DataTypes.INTEGER,
        references:{
            model:itemModel,
            key:'itemCode'
        }
    },
    rate:{
        type:DataTypes.NUMBER,
        allowNull:false
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false
    },
    qty:{
        type:DataTypes.NUMBER,
        allowNull:false
    },
})

Data.sync({alter:true}).then(() => {
    console.log("Data Model synced");
});

module.exports = Data