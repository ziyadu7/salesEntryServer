const { sq } = require('../config/dbConfig')
const { DataTypes } = require("sequelize");

const Items = sq.define('items', {
    itemCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    itemName: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

Items.sync({alter:true}).then(() => {
    console.log("Items Model synced");
});

module.exports = Items