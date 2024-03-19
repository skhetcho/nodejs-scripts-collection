/**
 * This is a simple Express.js server that listens for POST requests on the root route ('/').
 * It's designed to act as a webhook receiver, processing incoming JSON payloads.
 * 
 * The server uses the 'body-parser' middleware to parse incoming request bodies as JSON.
 * 
 * When a POST request is received, the server extracts various properties from the request body.
 * These properties include 'isPaid', 'isInvoice', 'customer', 'publicId', 'customerPhone', 'eventType', and 'documentId'.
 * 
 * The server then checks the 'eventType' property to determine how to handle the request.
 * If 'eventType' is 'deleted', it logs the entire request body and a deletion message.
 * If 'eventType' is 'updated', it logs the extracted properties and an update message.
 * If 'eventType' is 'created', it logs the entire request body and a creation message.
 * 
 * The server listens on port 3000 and logs a message when it starts listening.
 */
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.post('/', (request, response) => {
    const { body } = request;

    let eventType = 'initial';
    let isPaid = false;
    let isInvoice = false;
    let customer = "";
    let publicId = "";
    let customerPhone = "";
    let documentId = "";

    //test local variables for non-null values
    if (body[0] != null && body[0].data != null && body[0].data.isPaid != null) {
        isPaid = body[0].data.isPaid
    }
    if (body[0] != null && body[0].data != null && body[0].data.isInvoice != null) {
        isInvoice = body[0].data.isInvoice
    }
    if (body[0] != null && body[0].data != null && body[0].data.customer != null) {
        customer = body[0].data.customer
    }
    if (body[0] != null && body[0].data != null && body[0].data.publicId != null) {
        publicId = body[0].data.publicId
    }
    if (body[0] != null && body[0].data != null && body[0].data.customerPhone != null) {
        customerPhone = body[0].data.customerPhone
    }
    if (body[0] != null && body[0].eventType != null) {
        eventType = body[0].eventType;
    }
    if (body[0] != null && body[0].documentId != null) {
        documentId = body[0].documentId;
    }

    if (eventType == 'deleted') {
        console.log(body)
        console.log("The record has been deleted for")
    }
    if (eventType == 'updated') {
        console.log(eventType)
        console.log(isPaid)
        console.log(isInvoice)
        console.log(customer)
        console.log(publicId)
        console.log(customerPhone)
        console.log(documentId)
        console.log("The record has been updated for")
    }
    if (eventType == 'created') {
        console.log(body)
        console.log("The record has been deleted for")
    }
});
app.listen(port, () => {
    console.log(`Express api/webhook app listening at http://localhost:${port}`);
});