require('dotenv').config();

const fetch = require('node-fetch');
const fs = require('fs')
var url = require('url');
var https = require('https');
const HttpsProxyAgent = require('https-proxy-agent');
const { default: axios } = require('axios');
const proxies = [
  'http://43.225.140.143:30001',
  'http://71.19.249.118:8001',
  'http://158.69.185.37:3129',
  'http://114.119.189.123:3128',
  'http://130.41.55.190:8080',
  'http://130.41.15.76:8080',
  'http://40.67.252.70:8080',
  'http://27.111.83.207:8080',
  'http://130.41.41.175:8080',
  'http://202.152.5.158:3128',
  'http://141.98.16.38:8080',
  'http://103.169.20.46:8080',
  'http://125.21.3.41:8080',
  'http://193.122.71.184:3128',
  'http://8.219.97.248:80',
  'http://131.72.79.101:3128',
  'http://208.52.157.37:5555',
  'http://8.209.127.181:1080',
  'http://210.212.227.67:3128',
  'http://201.71.2.97:999',
  'http://45.167.126.249:9992',
  'http://208.52.180.90:5555',
  'http://47.250.47.37:1100',
  'http://157.100.12.138:999',
  'http://47.91.57.156:30001',
  'http://88.99.216.114:9001',
  'http://188.0.147.102:3128',
  'http://171.237.235.35:5003',
  'http://143.244.45.5:3128',
  'http://179.231.2.117:8080',
  'http://139.9.64.238:443',
  'http://176.58.112.123:1080',
  'http://190.107.233.230:999',
  'http://150.107.137.25:8080',
  'http://143.198.182.218:80',
  'http://187.130.139.197:8080',
  'http://168.138.36.173:33080',
  'http://190.210.152.170:3128',
  'http://79.140.17.172:8016',
  'http://110.138.212.102:8800',
  'http://190.217.81.59:999',
  'http://46.151.189.39:8081',
  'http://173.212.216.104:3128',
  'http://138.117.228.5:999',
  'http://47.91.124.200:22106',
  'http://208.52.166.109:5555',
  'http://139.224.165.41:1080',
  'http://85.60.107.64:8118',
  'http://45.175.65.190:1010',
  'http://200.85.183.99:8080',
  'http://8.141.251.188:3128',
  'http://218.244.147.59:3128',
  'http://221.5.80.66:3128',
  'http://119.8.238.213:8118',
  'http://208.52.137.153:5555',
  'http://208.52.145.209:5555',
  'http://154.212.7.248:999',
  'http://139.198.157.59:7890',
  'http://47.74.66.7:30001',
  'http://208.52.157.99:5555',
  'http://180.178.188.228:8282',
  'http://38.65.137.210:999',
  'http://39.104.53.151:9098',
  'http://208.52.145.194:5555',
  'http://45.170.102.89:999',
  'http://120.46.137.97:8888',
  'http://123.56.21.84:8080',
  'http://208.52.166.105:5555',
  'http://218.1.142.147:57114',
  'http://208.52.145.216:5555',
  'http://103.36.8.133:3125',
  'http://213.212.247.203:1981',
  'http://45.70.236.125:999',
  'http://208.52.145.229:5555',
  'http://158.69.72.138:9300',
  'http://186.119.118.42:8082',
  'http://138.0.21.131:5340',
  'http://14.97.146.210:3129',
  'http://62.193.108.138:1981',
  'http://208.52.180.68:5555',
  'http://47.113.189.83:30001',
  'http://14.115.104.76:808',
  'http://208.52.145.232:5555',
  'http://5.58.110.249:8080',
  'http://118.31.37.213:9001',
  'http://121.58.235.10:8091',
  'http://167.114.96.27:9300',
  'http://41.65.236.57:1981',
  'http://188.133.153.133:1256',
  'http://181.129.49.214:999',
  'http://106.75.171.235:8080',
  'http://45.5.58.62:999',
  'http://62.193.68.67:1976',
  'http://208.52.145.210:5555',
  'http://191.97.14.26:999',
  'http://208.52.180.74:5555',
  'http://208.52.157.75:5555',
  'http://182.253.72.89:8082',
  'http://41.33.219.141:8080',
  'http://190.109.24.214:999',
]


function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const carApiUrl = "http://www.carqueryapi.com/api/0.3/?"

const request = {
  headers: {
    'Accept': '*/*',
    'Content-Type': 'application/json',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36'
  },

};

async function makeScrapeAPI(YEAR) {
  try {
    let response = await await fetch(carApiUrl + new URLSearchParams({
      cmd: 'getMakes',
      year: YEAR,
      _: '166152053' + Math.floor(1000 + Math.random() * 9000)
    }), request);
    let responseJson = await response.json();
    // console.log(responseJson)
    const jsonString = JSON.stringify(responseJson)
    fs.writeFile(`./Makes_By_Year/${YEAR}_Make.json`, jsonString, err => {
      if (err) {
        console.log('Error writing file', err)
      } else {
        console.log('Successfully wrote file')
      }
    })
    return responseJson;
  }
  catch (err) {
    console.error(err.message);
  }
}

async function modelPerMakeYear(YEAR) {
  let rawMakeData = fs.readFileSync(`./Makes_By_Year/${YEAR}_Make.json`);
  let makeData = JSON.parse(rawMakeData);
  console.log(YEAR + ": " + makeData.Makes.length);

  for (var i = 0; i < makeData.Makes.length; i++) {
    try {
      let random_proxy = Math.floor(Math.random() * 100);
      let agent = new HttpsProxyAgent.HttpsProxyAgent(proxies[random_proxy]);
      console.log("using proxy server: " + proxies[random_proxy])
      let endpoint = carApiUrl + new URLSearchParams({
        cmd: 'getModels',
        make: makeData.Makes[i].make_id,
        year: YEAR,
        _: '1661528' + Math.floor(100000 + Math.random() * 900000)
      });
      let axiosResponse = await axios.get(endpoint, {
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36'
        },
        proxy: false,
        httpsAgent: agent
      })
      if (axiosResponse.data.error){
        console.log(axiosResponse.data)
      }
      else {
        const jsonString = JSON.stringify(axiosResponse.data)
        fs.writeFile(`./Models_Per_Make_Year/${YEAR}/${makeData.Makes[i].make_id}.json`, jsonString, err => {
          if (err) {
            console.log('Error writing file', err);
          } else {
            console.log('Successfully wrote file: ' + `${YEAR}/${makeData.Makes[i].make_id}.json`);
          }
        })
      }
    }
    catch (err) {
      console.error(err.message);
    }
    await sleep(1000);
  }
}


(async function () {
  for (var i = 2010; i < 2011; i++) {
    modelPerMakeYear(i)
    await sleep(60000) //sleep 3 seconds
  }
})()
