var DeepAffects = require('deep-affects');

var defaultClient = DeepAffects.ApiClient.instance;

// Configure API key authorization: UserSecurity
var UserSecurity = defaultClient.authentications['UserSecurity'];
UserSecurity.apiKey = process.env.DEEPAFFECTS_API_KEY;

//audio emotion api
var api = new DeepAffects.EmotionApi();

var callback = function (error, data, response) {
    if (error) {
        console.error(error);
    } else {
        console.log('\n\n\nAPI called successfully. Returned data:');
        var str = JSON.stringify(data, null, 4);
        console.log(str)
    }
};

var body = DeepAffects.Audio.fromFile('./6.mp3'); // {Audio} Audio object that needs to be denoised.
api.syncRecogniseEmotion(body, callback);

//text emotion api
// var api = new DeepAffects.EmotionApi();

// var body = {
//   content: "YOUR_TEXT"
// };

// var callback = function(error, data, response) {
//   if (error) {
//     console.error(error);
//   } else {
//     console.log("API called successfully. Returned data: " + data);
//   }
// };
// // sync request
// api.syncRecogniseTextEmotion(body, callback);