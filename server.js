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

// Admin page
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/html/admin.html'))
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
  if(arduinoManager.setName(req.params.id, req.params.name)){
    res.status = 200
    res.send('Name altered')
  } else {
    res.status = 520
    res.send('Arduino does not exist')
  }
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
    let message = ''
    let id = parseInt(req.params.id, 10)
    if(!Number.isInteger(id)) {
        res.status(520)
        message = 'invalid name'
    } else {
      if(arduinoManager.doesExist(id)) {
        arduinoManager.setState(id, req.params.temp, req.params.hum)
        message = "Arduino altered"
      } else {
        arduinoManager.add(id, req.params.temp, req.params.hum)
        message = "Arduino created"
      }
      res.status(200)
      logger.logBold('API', 'API was called')
    }
    res.send(message)
})

/*
* API call : getAllValues
* description : Returns all the values of all arduinos in a json
*/
app.get('/API/getAllValues', (req, res) => {
  logger.log('API', 'getAllValues called')
  res.send(arduinoManager.getAllValues());
})

/*
* API call : remove
* description : Removes the arduino by the id given
*/
app.get('/API/remove/:id', (req, res) => {
  logger.logBold("server", "remove by id called")
  let message = ''
  if(arduinoManager.doesExist(req.params.id)) {
    arduinoManager.removeById(req.params.id)
    message = 'Arduino removed'
    res.status(200)
  } else {
    res.status(520)
    message = "The given arduino doesn't exist"
  }
  res.send(message)
})




// Starting the server
app.listen(port)
logger.logBold('SERVER', 'listening on port : ' + port)
