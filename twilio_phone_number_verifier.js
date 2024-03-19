const fetch = require("node-fetch");

const verifyPhoneNumber = '+1......'
const verificationCode = '123456'

async function verifyCode() {
    const sender = new URLSearchParams();
    sender.append("to", verifyPhoneNumber);
    sender.append("code", verificationCode);
    const data = await fetch("https://verify-3004-fhtlsg.twil.io/check-verify", {
      method: "POST",
      body: sender
    })
    const json = await data.json();
    console.log("json....: ", json)
  }
  verifyCode();