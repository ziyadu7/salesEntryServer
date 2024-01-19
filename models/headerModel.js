const { sq } = require('../config/dbConfig')
const { DataTypes } = require("sequelize");

const Header = sq.define('headers', {
    vrNo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    vrDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    acName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    acAmount:{
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