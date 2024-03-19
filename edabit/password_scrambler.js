
/**
 * Generates a secret password based on a given message.
 * This secret password generator is preliminary and has limited functionality.
 * It checks if the message length is 9 characters and consists only of lowercase letters.
 * If the conditions are met, it performs various transformations on the message to generate the secret password.
 * Otherwise, it returns a default password "BANG! BANG! BANG!".
 * 
 * @param {string} message - The message to generate the secret password from.
 * @returns {string} - The secret password generated from the message.
 */

function secretPassword(message) {
    var result = "BANG! BANG! BANG!";
    console.log(!/^[a-z]*$/g.test(message))
    if (message.length == 9 && !(!/^[a-z]*$/g.test(message))) {
        var messageArray = [];
        var finalMessage = [];
        messageArray[0] = message.slice(0, 3);
        messageArray[1] = message.slice(3, 6);
        messageArray[2] = message.slice(6, 9);
        
        finalMessage.push(messageArray[1].split("").reverse().join(""));

        for (var i = 0; i < 3; i++){
            finalMessage.push(String.fromCharCode(messageArray[2][i].charCodeAt(0) + 1));
        }

        finalMessage.push(messageArray[0][0].charCodeAt(0) - 96);
        finalMessage.push(messageArray[0][1]);
        finalMessage.push((messageArray[0][2].charCodeAt(0) - 96));
        
        result = finalMessage.join('');
        return result;
    }
    else{
        return result;
    }
}


console.log(secretPassword("airforce1"));
console.log(secretPassword("mubashaer"));