const { sq } = require('../config/dbConfig')
const { DataTypes } = require("sequelize");

const Items = sq.define('items', {
    itemCode: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    itemName: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

Items.sync({alter:true}).then(() => {
    console.log("User Model synced");
});

module.exports = Items