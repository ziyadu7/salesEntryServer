const express = require('express')
const {testDbConnection} = require('./config/dbConfig')
const router = require('./routes/router')
require('dotenv').config()

testDbConnection()

const app = express()

app.use(express.json())
app.use('/',router)


app.listen(process.env.PORT||300,()=>{
    console.log('Server started');
})