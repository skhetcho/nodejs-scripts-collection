require('dotenv').config();

const fetch = require('node-fetch');

//get bearer token
const url = 'https://api.shopmonkey.io/v2/token';
const keyInfo = {
    method: 'POST',
    headers: { Accept: 'text/html', 'Content-Type': 'application/json' },
    body: JSON.stringify({ publicKey: process.env.PUBLICKEY_SHOPMONKEY, privateKey: process.env.PRIVATEKEY_SHOPMONKEY })
};

//get customer
const urlGetCustomer = 'https://api.shopmonkey.io/v2/customers';
const bodyGetCustomer = {
    sort: "creationDate",
    offset: "0",
    limit: "50",
    includeShopmonkeyCustomers: true,
    //customer phont number
    phone: "%2B12256360000" //+12256360000
}





fetch(url, keyInfo)
    //generate a new bearer token
    .then(res => res.text())
    .then(bearer => {
        //pass bearer token to two different option objects
        console.log(bearer)
        //get method option
        const getOptions = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${bearer}`
            }
        };
    })
    .catch(err => console.error('error: ' + err));



//URL constructor to ease the process of generating the necessary url for the fetch requests
const constructUrl = (url, params) => {
    let URL = url + "?";
    for (i = 0; i < Object.keys(params).length; i++) {
        URL += "&" + `${Object.keys(params)[i]}=${params[Object.keys(params)[i]]}`
    }
    return URL;
}