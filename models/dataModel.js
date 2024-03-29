const { sq } = require('../config/dbConfig')
const { DataTypes } = require("sequelize");
const itemModel = require('./itemModel')
const headerModel = require('./headerModel')

const Data = sq.define('datas', {
    vrno: {
        type:DataTypes.INTEGER,
        references:{
            model:headerModel,
            key:'vrno'
        }
    },
    srno: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    item:{
        type:DataTypes.INTEGER,
        references:{
            model:itemModel,
            key:'itemcode'
        }
    },
    rate:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    qty:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
})

Data.belongsTo(headerModel, { foreignKey: 'vrno', as: 'header' });
Data.belongsTo(itemModel, { foreignKey: 'item', as: 'itemDetails' });

Data.sync({alter:true}).then(() => {
    console.log("Data Model synced");
});

module.exports = Data