const express = require('express')
const app = express()
const mongoose = require('mongoose')
const server = require('http').Server(app)
const io = require('socket.io')(server)
const PORT = process.env.PORT || 5000
const socket = require('./socket/socket')

const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()

app.use(cors())
app.use(cookieParser())
app.use(express.json({
    extended: true
}))


app.set('socketio',io)
socket(app)

app.use('/api/game',require('./request/game'))

const start = async () =>{
    try{   
        await mongoose.connect(process.env.MONGO,{ useNewUrlParser: true, useUnifiedTopology: true })
        server.listen(PORT,()=>console.log(PORT))
    }
    catch(err){
        console.log(err.message)
    }
}

start();