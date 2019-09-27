const host = 'http://localhost:8081'
const getAllValuesRequest = host + '/API/getAllValues'
const setNameRequest = host + '/setName/'
const updateInterval = 3000 // time in milliseconds between each api call

let arduino = {"temp":999,"hum":999,"id":1}
let arduinoCount = 0;
let oldArduinos = ''

// Does a request do the server to get all values
// returns the servers response
function getAllValues() {
  let xmlhttp = new XMLHttpRequest()
  xmlhttp.open('GET', getAllValuesRequest, false)
  xmlhttp.send(null)
  return xmlhttp.responseText;
}

// Fetches info
function updateDashboard(admin = false) {
  let response = getAllValues()
  console.log(response)
  arduino = JSON.parse(response)["arduinos"]
  console.log(arduino.length + '   ' + arduinoCount)

  if(arduino != oldArduinos) {
    adaptDashboard(arduino, admin)
    oldArduinos = arduino
  }
  for(let i = 0; i < arduino.length; i++) {
    //console.log(arduino[i].id + " " + arduino[i].temp + " " + arduino[i].hum)

    // Updates name in table
    let nameHTML = document.getElementById(arduino[i].id + 'name')
    nameHTML.innerHTML = arduino[i].name

    // Updates temperature in table
    let tempHTML = document.getElementById(arduino[i].id + 'temp')
    tempHTML.innerHTML = arduino[i].temp + '°C'

    // Updates humidity in table
    let humHTML = document.getElementById(arduino[i].id + 'hum')
    humHTML.innerHTML = arduino[i].hum + '%'
  }
}


// param : parsed json with a arduino list
// Alters the table size and the values inside
function adaptDashboard(arduino, admin) {
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
  th.appendChild(document.createTextNode('Name'))
  tr.appendChild(th)

  th = document.createElement('th')
  th.appendChild(document.createTextNode('Temperature'))
  tr.appendChild(th)

  th = document.createElement('th')
  th.appendChild(document.createTextNode('Humidity'))
  tr.appendChild(th)

  // If it's the admin page, adds buttons to delete and rename
  if(admin) {
    th = document.createElement('th')
    th.appendChild(document.createTextNode('Delete'))
    tr.appendChild(th)


    th = document.createElement('th')
    th.appendChild(document.createTextNode('Rename'))
    tr.appendChild(th)
  }

  tbl.appendChild(tr)

  // Adds table entries for the arduinos
  for(let i = 0; i < arduino.length; i++) {
    tr = document.createElement('tr')

    td = document.createElement('td')
    td.setAttribute('id', arduino[i].id + 'id')
    td.innerHTML = arduino[i].id
    tr.appendChild(td)

    td = document.createElement('td')
    td.setAttribute('id', arduino[i].id + 'name')
    tr.appendChild(td)

    td = document.createElement('td')
    td.setAttribute('id', arduino[i].id + 'temp')
    tr.appendChild(td)

    td = document.createElement('td')
    td.setAttribute('id', arduino[i].id + 'hum')
    tr.appendChild(td)

    // If it's the admin page, add buttons for each element
    if(admin) {
      td = document.createElement('td')
      td.setAttribute('id', arduino[i].id + 'Del')

      let btn
      btn = document.createElement('button')
      btn.innerHTML = 'Delete'
      btn.addEventListener('click', () => {
        deleteArduino(arduino[i].id)
      })

      td.appendChild(btn)
      tr.appendChild(td)

      td = document.createElement('td')
      td.setAttribute('id', arduino[i].id + 'Ren')

      btn = document.createElement('button')
      btn.innerHTML = 'rename'
      btn.addEventListener('click', () => {
        renameArduino(arduino[i].id)
      })

      td.appendChild(btn)
      tr.appendChild(td)
    }

    tbl.appendChild(tr)
  }


  // Add everything to the html after emptying the body
  body.innerHTML = ''
  body.appendChild(tbl)

  arduinoCount = arduino.length
}



/*
  Sends an API call to change the arduinos name
*/
function setName(id, name) {
  let httpRequest = setNameRequest + id + '/' + name
}
