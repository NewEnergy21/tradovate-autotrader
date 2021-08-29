// auth.js
// Private authorization variables, hidden under .gitignore
// !!!FLAG!!! Rename to `auth.js` or another more useful filename for import purposes

module.exports = {
	
	//USER should be your username or email used for your Trader account
	USER: "username",

	//PASS should be the password assoc with that account
	PASS: "password!",

	// CID is from the Tradovate API Key generation
	CID: 123456789,

	// SEC is from the Tradovate API Key generation
	SEC: 'abcdef01-2345-6789-abcd-ef0123456789',

	// APPID is from the Tradovate API Key generation or custom
	APPID: "Sample App",

	// APPVERSION is from the Tradovate API Key generation or custom
	APPVERSION: "1.0",

	// DEVICEID may need to be hard-coded if you use a Node.js app to run the system
	// (it can't be random for live trading or else you run into "New Device Login Attempted" alerts that have to be approved
	DEVICEID: 'abcdef01-2345-6789-abcd-ef0123456789'

}

//END AUTHENTICATION VARIABLES --------------------------------------------------