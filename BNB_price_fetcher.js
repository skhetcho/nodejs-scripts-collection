const Web3 = require("web3");
const web3 = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545");
const priceAggregatorABI = [
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getLatestPrice",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]
const contractAddress = "0x631167bb51A8479a2de16Ada3CD05d6882fB2d30"

const bnbPriceFeed = new web3.eth.Contract(priceAggregatorABI, contractAddress);
bnbPriceFeed.methods.getLatestPrice().call().then((roundData) => {
	console.log(roundData);
})