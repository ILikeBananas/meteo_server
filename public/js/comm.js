const httpRequest = "http://192.168.43.84:8080/API/getAllValues";
const updateInterval = 3000 // time in milliseconds between each api call

let arduino = {"temp":999,"hum":999,"id":1}
let arduinoCount = 0;

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
  arduino = JSON.parse(response)["arduinos"]
  console.log(arduino.length + '   ' + arduinoCount)
  if(arduino.length != arduinoCount) {
    adaptDashboard(arduino)
  }
}


// param : parsed json with a arduino list
function adaptDashboard(arduino) {
  // creates the base table
  let body = document.getElementById('tableSpace')
  let tbl = document.createElement('table')
  tbl.style.width = '100%'
  tbl.setAttribute('border', '1')

  // table header
  let tr = document.createElement('tr')
  let th = document.createElement('th')
  th.appendChild(document.createTextNode('ID'))
  tr.appendChild(th)

  th = document.createElement('th')
  th.appendChild(document.createTextNode('Temperature'))
  tr.appendChild(th)

  th = document.createElement('th')
  th.appendChild(document.createTextNode('Huminity'))
  tr.appendChild(th)

  tbl.appendChild(tr)

  for(let i = 0; i < arduino.length; i++) {
    tr = document.createElement('tr')
    td = document.createElement('td')
    td.setAttribute('id', arduino[i].id + 'id')
    tr.appendChild(td)

    td = document.createElement('td')
    td.setAttribute('id', arduino[i].id + 'temp')
    tr.appendChild(td)
    td = document.createElement('td')
    td.setAttribute('id', arduino[i].id + 'hum')
    tr.appendChild(td)
    tbl.appendChild(tr)
  }

  body.innerHTML = ''
  body.appendChild(tbl)

  arduinoCount = arduino.length

}


// Updates the data every
setInterval(function() {
  updateDashboard()
}, updateInterval)
