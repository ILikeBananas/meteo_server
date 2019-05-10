/*
* Class : Logger
* Author : Jonny Hofmann
* Utility : Manages logs with warnings, logs, bold logs and errors with color in the console.
*/

const colors = require('colors')
colors.setTheme({
  error: [
    'red',
    'bold'
  ],
  warning: [
    'yellow',
    'bold'
  ],
  log: 'green',
  logBold: [
    'green',
    'bold'
  ]
})



class Logger {

  // Logs an error
  // caller = The code
  error(caller, message) {
    console.log(colors.error('[' + caller + '] : ' + message))
  }

  // Logs an important information
  logBold(caller, message) {
    console.log(colors.logBold('[' + caller + '] : ' + message))
  }

  // Logs not important messages
  log(caller, message) {
    console.log(colors.log('[' + caller + '] : ' + message))
  }

  // Logs an warning
  warn(caller, message) {
    console.log(colors.warning('[' + caller + '] : ' + message))
  }



}

module.exports = Logger
