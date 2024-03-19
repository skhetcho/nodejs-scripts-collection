const fs = require('fs');

function checkOrdersForMismatch() {
  // Read the file
  fs.readFile('ProcessedOrders.txt', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      return;
    }

    // Parse the file content to get the list of order objects
    const orders = JSON.parse(data);

    // Iterate through orders and check each order's poNumber
    orders.forEach(order => {
      if ((order.poNumber).toLowerCase() !== "shop1") {
        console.log(order.number);
      }
    });
  });
}

// Call the function
checkOrdersForMismatch();
