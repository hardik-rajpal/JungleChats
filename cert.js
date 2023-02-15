const express = require('express')
const https = require('https')
const path = require('path')
const fs = require('fs')
const app = express()
app.use('/',(req,res,next)=>{
    res.send('hello')
})

const sslserver = https.createServer({
    key:'',
    cert:''
},app)

sslserver.listen(3443,()=>console.log('ss on 33433'))