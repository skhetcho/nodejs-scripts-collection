/**
 * This script uses the 'twit' Node.js module to interact with the Twitter API.
 * 
 * It creates a new Twit instance with the necessary API keys, access tokens, and configuration options.
 * These include the consumer key, consumer secret, access token, access token secret, request timeout, and SSL setting.
 * 
 * The script then uses the Twit instance to get the 10 most recent tweets from the user timeline of 'SourenKhetcho'.
 * 
 * If the request is successful, the data is logged to the console.
 * 
 * Note: The API keys and access tokens are sensitive and should not be hard-coded or committed to version control.
 * They are loaded from environment variables for security.
 */

var Twit = require('twit')

const username = 'SourenKhetcho'

var T = new Twit({
    consumer_key:         process.env.TWITTER_CONSUMER_KEY,
    consumer_secret:      process.env.TWITTER_CONSUMER_SECRET,
    access_token:         process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret:  process.env.TWITTER_ACCESS_TOKEN_SECRET,
    timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
    strictSSL:            true,     // optional - requires SSL certificates to be valid.
  })

  T.get('statuses/user_timeline', {screen_name: username, count: 10}, {
      function (err, data, response) {
          console.log(data);
      }
  })