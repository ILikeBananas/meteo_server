const Arduino = require('./class/Arduino')
const ArduinoManager = require('./class/ArduinoManager')
const Logger = require('./class/Logger')

const express = require('express')
const path = require('path')
const app = express()

const port = 8080;

let arduinoManager = new ArduinoManager()

let logger = new Logger()


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/html/index.html'))
})

/////////
// API //
/////////
app.get('/API/:id/:temp/:hum', (req, res) => {
    //logger.log('API', ':id/:temp/:hum called')
    if(arduinoManager.doesExist(req.params.id)) {
      arduinoManager.setState(req.params.id, req.params.temp, req.params.hum)
    } else {
      arduinoManager.add(req.params.id, req.params.temp, req.params.hum)
    }
    res.send('daccord')
    logger.logBold('API', 'API was called')
})

app.get('/API/getAllValues', (req, res) => {
  logger.log('API', 'getAllValues called')
  res.send(arduinoManager.getAllValues());
})


///////////////////
// Static routes //
///////////////////
app.get('/JS/comm.js', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/js/comm.js'))
})



app.listen(port)
logger.logBold('SERVER', 'listening on port : ' + port)
