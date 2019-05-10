const httpRequest = "http://192.168.43.84:8080/API/getAllValues";
const updateInterval = 3000 // time in milliseconds between each api call

let arduino = {"temp":999,"hum":999,"id":1}


// Does a request do the server to get all values
// returns the servers response
function getAllValues() {
  let xmlhttp = new XMLHttpRequest()
  xmlhttp.open('GET', httpRequest, false)
  xmlhttp.send(null)
  return xmlhttp.responseText;
} 

function updateDashboard() {
  let response = getAllValues()
  arduino = JSON.parse(response)
  document.getElementById('id').innerHTML = arduino["id"];
  document.getElementById('temp').innerHTML = arduino.temp;
  document.getElementById('hum').innerHTML = arduino['hum'];
}


// Updates the data every
setInterval(function() {
  updateDashboard()
}, updateInterval)
