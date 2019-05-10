


const Logger = require('./Logger')
const CALLER = 'Arduino'
let logger = new Logger()


class Arduino {
  constructor(id, temp, hum) {
    this.id = id
    this.temp = temp
    this.hum = hum
  }

  // sets the temparature and the huminity on the arduino
  setState(temp, hum) {
    // Tests if the data is valid
    if(isNaN(temp) || isNaN(hum)) {
      logger.warn('ARDUINO', 'The given data is invalid! No changes made to arduino.')
    } else {
      this.temp = temp
      this.hum = hum
      logger.log('Arduino', 'Data of Arduino[' + this.id + '] is updated')
    }
  }

  // Returns the arduino's ID, temperature and humidity
  getValues() {
    return {
      id: this.id,
      temp: this.temp,
      hum: this.hum
    }
  }

  // Command to get a string to display all stats
  sayHello() {
    console.log("arduino " + this.id +
    "\n temp : " + this.temp +
    "\n hum : " + this.hum)
  }
}

module.exports = Arduino
