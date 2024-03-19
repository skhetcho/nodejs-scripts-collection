/**
 * This script uses the 'axios' and 'xml2js' modules to interact with the RegCheck.org.uk API.
 * 
 * It defines a 'soapRequest' function that sends a SOAP request to a given URL with specified headers and XML body.
 * It also defines a 'parseXml' function that converts an XML string into a JavaScript object.
 * 
 * The script then constructs a SOAP envelope with a 'CheckCanada' request. This request checks the registration details of a vehicle in Canada.
 * The registration number, state, and username for the request are hard-coded.
 * 
 * The script sends the SOAP request to the RegCheck API and parses the XML response.
 * 
 * If the request is successful, the script extracts the 'CheckCanadaResult' from the response and logs it to the console.
 * If an error occurs, the script logs the error to the console.
 * 
 * Note: The username for the RegCheck API is loaded from an environment variable for security.
 * Make sure to replace it with your own username and keep it secure.
 * Documentation: https://www.vehicleregistrationapi.ca/data/doc.aspx
 */

const axios = require('axios');
const xml2js = require('xml2js');

const url = 'http://www.regcheck.org.uk/api/reg.asmx?wsdl';

const soapRequest = (url, headers, xml) => {
  return axios.post(url, xml, { headers });
};

const parseXml = (xml) => {
  return new Promise((resolve, reject) => {
    xml2js.parseString(xml, { explicitArray: false }, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const registrationNumber = 'EV3O15';
const state = 'BC';
const username = process.env.REGCHECK_USERNAME;

const xml = `
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <CheckCanada xmlns="http://regcheck.org.uk">
      <RegistrationNumber>${registrationNumber}</RegistrationNumber>
      <state>${state}</state>
      <username>${username}</username>
    </CheckCanada>
  </soap:Body>
</soap:Envelope>
`;

const headers = {
  'Content-Type': 'text/xml;charset=UTF-8',
  'SOAPAction': 'http://regcheck.org.uk/CheckCanada'
};

soapRequest(url, headers, xml)
  .then((response) => {
    const xmlResponse = response.data;
    return parseXml(xmlResponse);
  })
  .then((result) => {
    // Extract data from XML response
    const data = result['soap:Envelope']['soap:Body']['CheckCanadaResponse']['CheckCanadaResult'];
    console.log(data);
  })
  .catch((error) => {
    console.error(error);
  });
