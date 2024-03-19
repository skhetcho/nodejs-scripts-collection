/**
 * This script is used to interact with the Twilio API.
 * It uses the 'twilio' Node.js module to create a client using the account SID and auth token from environment variables.
 * 
 * The script creates a new phone verification service via Twilio's Verify v2 API.
 * The friendly name for the new service is 'Phone Verification Service'.
 * 
 * After the service is created, the service SID is logged to the console.
 * This SID can be used to interact with the service in future API requests.
 * 
 * Note: The Twilio account SID and auth token are sensitive and should not be hard-coded or committed to version control.
 * They are loaded from environment variables for security.
 */

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);


client.verify.v2.services
    .create({ friendlyName: 'Phone Verification Service' })
    .then(service => console.log(service.sid));
