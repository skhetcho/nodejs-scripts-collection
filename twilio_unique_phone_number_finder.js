/**
 * This script uses the Twilio API to search for available phone numbers in the US that match a specific pattern.
 * 
 * It uses the 'twilio' Node.js module to create a client using the account SID and auth token from environment variables.
 * It also uses the 'libphonenumber-js' module to parse and format phone numbers.
 * 
 * The script defines a pattern for the desired phone numbers. This pattern is a string where '*' can be used as a wildcard.
 * 
 * The script then uses the Twilio client to list available local phone numbers in the US that contain the pattern.
 * 
 * If any matching numbers are found, they are logged to the console in national format.
 * If no matching numbers are found, a message is logged to the console.
 * 
 * If an error occurs while searching for phone numbers, the error is logged to the console.
 * 
 * Note: The Twilio account SID and auth token are sensitive and should not be hard-coded or committed to version control.
 * They are loaded from environment variables for security.
 */

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);
const { parsePhoneNumber, CountryCode } = require('libphonenumber-js');

// Replace the pattern with your desired pattern
const pattern = '1234*'; // for example, a number ending with 1234

client.availablePhoneNumbers('US')
  .local
  .list({contains: pattern})
  .then(numbers => {
    if (numbers.length > 0) {
      console.log('Available phone numbers with the desired pattern:');
      numbers.forEach(number => {
        const phoneNumber = parsePhoneNumber(number.phoneNumber, CountryCode.US);
        console.log(phoneNumber.formatNational());
      });
    } else {
      console.log('No numbers found with the desired pattern.');
    }
  })
  .catch(error => {
    console.error('Error searching for phone numbers:', error);
  });