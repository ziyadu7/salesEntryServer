const { sq } = require('../config/dbConfig')
const { DataTypes } = require("sequelize");

const Header = sq.define('headers', {
    vrno: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    vrdate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    acname:{
        type:DataTypes.STRING,
        allowNull:false
    },
    acamount:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    status:{
        type:DataTypes.ENUM,
        values:['A','I'],
        allowNull:false
    }
})

Header.sync({alter:true}).then(() => {
    console.log("Header Model synced");
});

module.exports = Header