const axios = require('axios');

//get bearer token
const url = 'https://api.shopmonkey.io/v2/token';
const keyInfo = {
    method: 'post',
    url: url,
    headers: { Accept: 'text/html', 'Content-Type': 'application/json' },
    data: {
        publicKey: process.env.PUBLICKEY_SHOPMONKEY,
        privateKey: process.env.PRIVATEKEY_SHOPMONKEY
    }
};

let orderDetails; // This variable will hold the order details

function getOrderDetails(orderId) {
    axios(keyInfo)
        //generate a new bearer token
        .then(response => {
            let bearer = response.data;
            //pass bearer token to two different option objects

            //get method option
            const getOptions = {
                method: 'get',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${bearer}`
                }
            };
            //retrieve the orders associated with the requested user
            axios.get(`https://api.shopmonkey.io/v2/orders/${orderId}/services`, getOptions)
                .then(response => {
                    orderDetails = response.data;
                    console.dir(orderDetails, { depth: null });
                })
                .catch(err => console.error('error:' + err));
        })
        .catch(err => console.error('error: ' + err));
}

getOrderDetails('649dab0848d57464e4337872')