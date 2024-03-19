function getBufferFromBase64() {
    const bfr = Buffer.from(
        'USEREMAIL:SECRET_API_KEY'
    ).toString('base64')

    console.log(bfr)
}

getBufferFromBase64();