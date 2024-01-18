const express = require('express')
const {testDbConnection} = require('./config/dbConfig')
require('dotenv').config()

testDbConnection()

const app = express()


app.listen(process.env.PORT||300,()=>{
    console.log('Server started');
})