const var modbus = require("modbus-stream")

Class Automaton{
	
	var connection
	
	constructor(automatonIp, communicationPort = 502, debugName = "automate"){
		this.communicationPort = communicationPort
		this.automatonIp = automatonIp
		this.debugName = debugName
	}
	
	// Connect automaton
	connect(){
		modbus.tcp.connect(communicationPort, automateIp, { debug: debugName }, (err, connection) => {
			if (err) {
				console.log("Can't be connected.");
				throw err;
			}
			else {
				console.log("Connected !");
			}
		}
	}
	
	// Disconnect automaton
	disconnect(){
		connection.close();
	}
	
	// Write on single register
	writeSingleRegister(address, value){
		connection.writeSingleRegister({ address: address, value: Buffer.from(value) }, (err) => {
            if (err) {
                console.log("Writing error");
            }
            else {
                console.log("Writing OK");
            }
        });
	}
	
	// Get value of register
	get GetInputRegisters(address, quantity){
		var resource = null
		
		connection.readInputRegisters({address: 1000, quantity: 1}, (err, resource) => {
            if (err) {
                console.log("Reading error");
            }
            else {
                console.log("Reading OK");
            }
            connection.close();
        })
		
		return resource
	}
	
	// Read value of register
	readResource(resource){
		console.log(resource.response.data);
	}
}