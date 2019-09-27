/*
JS file for the admin page
*/

const deleteArduinoRequest = '/API/REMOVE/'
const renameArduinoRequest = '/API/setname/'

// Updates the data every {updateInterval}_
setInterval(function() {
  updateDashboard(true)
}, updateInterval)

function deleteArduino(id) {
  let request = deleteArduinoRequest + id
  let xmlhttp = new XMLHttpRequest()
  xmlhttp.open('GET', request, false)
  xmlhttp.send(null)
}

function renameArduino(id) {
  let name = prompt("Choisissez le nom du arduino: ", "cuisine")
  let request = renameArduinoRequest + id + '/' + name
  console.log(request)
  let xmlhttp = new XMLHttpRequest()
  xmlhttp.open('GET', request, false)
  xmlhttp.send(null)
}
