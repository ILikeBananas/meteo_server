const express = require('express')
const Arduino = require('./Arduino')
const Logger = require('./Logger')
const path = require('path')
const app = express()

const port = 8080;

let arduino = new Arduino(1)
let logger = new Logger()


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'))
})

/////////
// API //
/////////
app.get('/API/:id/:temp/:hum', (req, res) => {
    //logger.log('API', ':id/:temp/:hum called')
    arduino.setState(req.params.temp, req.params.hum)
    arduino.id = req.params.id

    //arduino.sayHello()
    res.send('daccord')
})

app.get('/API/getAllValues', (req, res) => {
  logger.log('API', 'getAllValues called')
  res.send({
    temp: arduino.temp,
    hum: arduino.hum,
    id: arduino.id
  });
})


///////////////////
// Static routes //
///////////////////
app.get('/JS/comm.js', (req, res) => {
  res.sendFile(path.join(__dirname + '/comm.js'))
})



app.listen(port)
logger.logBold('SERVER', 'listening on port : ' + port)
