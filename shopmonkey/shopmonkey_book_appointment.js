require('dotenv').config();

const fetch = require('node-fetch');

//get bearer token
const url = 'https://api.shopmonkey.io/v2/token';
const keyInfo = {
    method: 'POST',
    headers: { Accept: 'text/html', 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
        publicKey: process.env.PUBLICKEY_SHOPMONKEY,
        privateKey: process.env.PRIVATEKEY_SHOPMONKEY
    })
};



//get order
const urlGetOrder = 'https://api.shopmonkey.io/v2/appointments';

let orderNumber = 212797;
function createOrderRecords() {
    fetch(url, keyInfo)
        //generate a new bearer token
        .then(res => res.text())
        .then(bearer => {
            //pass bearer token to two different option objects
            //get method option
            const getOptions = {
                method: 'POST',
                headers: {
                    // Accept: 'application/json',
                    Accept: 'application/json',
                    'content-type': 'application/json',
                    Authorization: `Bearer ${bearer}`
                },
                body: JSON.stringify({
                    color: 'cornflowerblue',
                    name: 'New Appointment',
                    isAllDay: false,
                    sendEmail: false,
                    sendSms: false,
                    isSendConfirmation: false,
                    isSendReminder: false,
                    // orderId: '65130f01a8b296e18c133c74',
                    endDate: '2023-09-27T17:00:53.000Z',
                    startDate: '2023-09-27T15:00:53.000Z',
                    vehicleId: '6471184df759cc0013b09ffd',
                    customerId: '6471183ff759cc0013b039b3'
                })
            };
            console.log(getOptions)
            fetch(urlGetOrder, getOptions)
                .then(res => res.json())
                .then(json => {
                    console.log(JSON.stringify(json, null, 4))
                })
                .catch(err => console.error('error:' + err));
        })
        .catch(err => console.error('error: ' + err));


}
//URL constructor to ease the process of generating the necessary url for the fetch requests
const constructUrl = (url, params) => {
    let URL = url + "?";
    for (i = 0; i < Object.keys(params).length; i++) {
        URL += "&" + `${Object.keys(params)[i]}=${params[Object.keys(params)[i]]}`
    }
    return URL;
}

createOrderRecords();

