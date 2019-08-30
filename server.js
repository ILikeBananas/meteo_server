// Classes
const Arduino = require('./class/Arduino')
const ArduinoManager = require('./class/ArduinoManager')
const Logger = require('./class/Logger')

// NPM Modules
const express = require('express')
const path = require('path')
const app = express()

const port = 8081;

let arduinoManager = new ArduinoManager()
let logger = new Logger()

// Index page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/html/index.html'))
})

// static public directory
app.use('/public', express.static('public'))

/////////
// API //
/////////

/*
* API call : setName
* description : Sets the name of the given arduino
* :id : the arduinos ID
* :name : name to give to the arduino
*/
app.get('/API/setName/:id/:name', (req, res) => {
  arduinoManager.setName(req.params.id, req.params.name)
  res.send('ok')
})

/*
* API call : setState
* description : Sets the temperature and the humidity
* :id : ID of the arduino to change
* :temp : the new temperature
* :hum : the new humidity
*/
app.get('/API/setState/:id/:temp/:hum', (req, res) => {
    //logger.log('API', ':id/:temp/:hum called')
    if(arduinoManager.doesExist(req.params.id)) {
      arduinoManager.setState(req.params.id, req.params.temp, req.params.hum)
    } else {
      arduinoManager.add(req.params.id, req.params.temp, req.params.hum)
    }
    res.send('daccord')
    logger.logBold('API', 'API was called')
})

/*
* API call : getAllValues
* description : Returns all the values of all arduinos in a json
*/
app.get('/API/getAllValues', (req, res) => {
  logger.log('API', 'getAllValues called')
  res.send(arduinoManager.getAllValues());
})



// Starting the server
app.listen(port)
logger.logBold('SERVER', 'listening on port : ' + port)
