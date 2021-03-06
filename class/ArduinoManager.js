/*
* Class : ArduinoManager
* Author : Jonny Hofmann
* Utility : Manages(get, delete, add, etc) arduinos in a list
*/


const CALLER = 'Arduino manager'
const Logger = require('./Logger')
const Arduino = require('./Arduino')

let logger = new Logger()


class ArduinoManager {
  constructor() {
    this.arduinos = []

  }

  // Adds a new Arduino to the list
  add(id, temp, hum) {
    if(!this.doesExist(id)) {
      this.arduinos[this.arduinos.length] = new Arduino(id, temp, hum)
    }
  }

  // Removes an arduino with the given ID
  removeById(idToRemove) {
    for (let i = 0; i  < this.arduinos.length; i++) {
      if(this.arduinos[i].id == idToRemove) {
        this.arduinos.splice(i, 1)
        return
      }
    }
    logger.warn(CALLER, 'removeById() : Id not found and not deleted, id : ' + idToRemove)
  }

  getById(id) {
    for (let i = 0; i < this.arduinos.length; i++) {
      if(this.arduinos[i].id == id) {
        return this.arduinos[i]
      }
    }
    logger.warn(CALLER, 'getById() : Arduino not in the list. ID : ' + id)
  }

  // Returns true if the given id exists
  doesExist(id) {
    for(let i = 0; i < this.arduinos.length; i++) {
      if(this.arduinos[i].id == id) {
        return true
      }
    }
    return false
  }

  // Sets the data to the arduino
  setState(id, temp, hum) {
    for(let i = 0; i < this.arduinos.length; i++) {
      if(this.arduinos[i].id == id) {
        this.arduinos[i].setState(temp, hum)
        return
      }
    }
    logger.warn(CALLER, 'setState() : Index does not exist. id : ' + id)
  }

  // Returns a Json with all the data of all arduinos
  getAllValues() {
    let response = '{"arduinos" : ['
    for(let i = 0; i < this.arduinos.length; i++) {

      // Adds a comma if it is the first element in the json
      if(i != 0) {
        response += ','
      }

      response += '{"id": ' + this.arduinos[i].id + ', "temp" : ' + this.arduinos[i].temp + ', "hum" : ' + this.arduinos[i].hum

      if(this.arduinos[i].name != '') {
        response += ', "name" : "' + this.arduinos[i].name + '"}'
      } else {
        response += '}'
      }

    }
    response += ']}'
    logger.log(CALLER, response)
    return response
  }

  // Set the name of the given arduino
  // returns true if it worked
  setName(id, name) {
    let exists = this.doesExist(id)
    if(exists) {
      this.getById(id).setName(name)
      logger.logBold(CALLER, id + ' changed name to ' + name)
    } else {
      logger.warn(CALLER, id + ' does not exist');
    }

    return exists
  }
}

module.exports = ArduinoManager
