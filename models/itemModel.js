const { sq } = require('../config/dbConfig')
const { DataTypes } = require("sequelize");

const Items = sq.define('items', {
    itemcode: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey: true
    },
    itemname: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

Items.sync({alter:true}).then(() => {
    console.log("Items Model synced");
});

module.exports = Items