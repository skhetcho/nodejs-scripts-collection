const fetch = require('node-fetch');
const fs = require('fs');

const bearer = process.env.SHOPMONKEY_BEARER;

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        authorization: `Bearer ${bearer}`
    }
};

async function fetchOrder(orderNumber) {
    const url = `https://api.shopmonkey.io/v2/orders?limit=50&number=${orderNumber}&offset=0&sort=creationDate`;
    let response = await fetch(url, options);

    if (!response.ok) {
        throw new Error(`Failed to fetch order #${orderNumber}: ${response.statusText}`);
    }

    let data = await response.json();
    return data;
}

async function getOrders(orderNumbers) {
    let Orders = [];

    for (let orderNumber of orderNumbers) {
        let orders = await fetchOrder(orderNumber);

        for (let order of orders) {
            let tagName = 'OpenAuto';
            let hasOpenAutoTag = order.tags && order.tags.some(tag => tag.name.toLowerCase() === tagName.toLowerCase());

            if (hasOpenAutoTag) {
                Orders.push(order);
            }
        }
    }

    return Orders;
}

async function saveOrdersToFile(orderNumbers) {
    try {
        let Orders = await getOrders(orderNumbers);
        fs.writeFileSync('ProcessedOrders.txt', JSON.stringify(Orders, null, 2));
        console.log('Saved orders to ProcessedOrders.txt');
    } catch (error) {
        console.error(`Error occurred: ${error.message}`);
    }
}

async function readAndReturnArray (filePath) {
    try {
      // Read the file
      const data = fs.readFileSync(filePath, "utf-8");
      
      // Split by line and remove carriage return character if it exists
      const lines = data.split("\n").map(line => line.replace("\r", "")).filter(Boolean);
      
      return lines;
    } catch (err) {
      console.error("An error occurred:", err);
      return [];
    }
  };

async function main() {
    const filePath = "orders.txt";
    const orderStrings = await readAndReturnArray(filePath);
    // console.log(orderStrings);
    const orderNumbers = orderStrings.map(orderString => orderString.replace('#', ''));
    await saveOrdersToFile(orderNumbers);
}
main();

// Use the function:
// const filePath = "orders.txt";
// const orderStrings = await readAndReturnArray(filePath);
// console.log(orderStrings);
// const orderStrings = ["#900695","#900459","#900469","#900471","#900477","#213940","#900478","#900485","#900489","#900493","#900503","#900509","#900516","#900517","#900519","#900524","#900526","#900542","#900543","#900544","#900545","#900546","#900552","#900554","#900555","#900557","#900560","#900561","#900563","#900566","#900572","#900583","#900590","#900598","#900600","#900603","#900604","#900605","#900606","#900611","#900612","#900613","#900617","#900618","#900619","#900621","#900622","#900627","#900632","#900633","#900635","#900639","#900645","#900654","#900656","#900662","#900667","#900668","#900669","#900678","#900680","#900684","#900689","#900690","#900701","#900706","#900707","#900712","#900714","#900717","#900720","#900723","#900724","#900729","#900731","#900735","#900737","#900740","#900742","#900743","#900746","#900748","#900749","#900751","#900762","#900764","#900766","#900784","#900785","#900795","#900802","#900805","#900527","#900594","#900637","#900747","#900755","#900812","#900450","#900452","#900453","#900454","#900455","#900456","#900460","#900461","#900462","#900463","#900464","#900465","#900466","#900467","#900468","#900470","#900473","#900474","#900475","#900476","#900479","#900480","#900483","#900414","#900487","#900488","#900490","#900491","#900495","#900497","#900498","#900501","#900502","#900504","#900506","#900507","#900508","#900511","#900512","#900513","#900514","#900521","#900523","#900525","#900528","#900529","#900530","#900531","#900541","#900548","#900549","#900550","#900551","#900556","#900558","#900559","#900562","#900568","#900569","#900573","#900575","#900576","#900577","#900579","#900580","#900581","#900582","#900584","#900586","#900588","#900589","#900591","#900592","#900595","#900596","#900597","#900599","#900602","#900609","#900610","#900615","#900616","#900623","#900624","#900625","#900628","#900629","#900630","#900631","#900634","#900636","#900643","#900646","#900647","#900648","#900649","#900650","#900653","#900659","#900660","#900661","#900663","#900664","#900665","#900666","#900670","#900671","#900672","#900673","#900674","#900675","#900677","#900682","#900683","#900685","#900688","#900692","#900693","#900697","#900698","#900699","#900700","#900715","#900716","#900718","#900721","#900726","#900727","#900730","#900732","#900738","#900741","#900744","#900745","#900641","#900754","#900758","#900759","#900734","#900607","#900770","#900771","#900774","#900776","#900777","#900791","#900801"];
// const orderNumbers = orderStrings.map(str => str.replace("#", ""));
// saveOrdersToFile(orderNumbers);
