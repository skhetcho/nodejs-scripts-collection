const fs = require('fs');
const { Configuration, OpenAIApi } = require("openai");
const { v4: uuidv4 } = require('uuid');
const { PineconeClient } = require("@pinecone-database/pinecone");
const fetch = require('node-fetch');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

function open_file(filepath) {
    return fs.readFileSync(filepath, 'utf-8');
}

function save_file(filepath, content) {
    fs.writeFileSync(filepath, content, 'utf-8');
}

function load_json(filepath) {
    return JSON.parse(fs.readFileSync(filepath, 'utf-8'));
}

function save_json(filepath, payload) {
    // Check if the directory containing the file exists, and create it if it doesn't
    try {
        const dir = filepath.split('/').slice(0, -1).join('/');
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        // Write the JSON content to the file
        fs.writeFileSync(filepath, JSON.stringify(payload, null, 2), 'utf-8');
    }
    catch (error) {
        console.log("errored with file saving")
    }
}


function timestamp_to_datetime(unix_time) {
    return new Date(unix_time * 1000).toLocaleString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short'
    });
}

// def gpt3_embedding(content, engine='text-embedding-ada-002'):
//     content = content.encode(encoding='ASCII',errors='ignore').decode()  # fix any UNICODE errors
//     response = openai.Embedding.create(input=content,engine=engine)
//     vector = response['data'][0]['embedding']  # this is a normal list
//     return vector

async function gpt3_embedding(content, engine = 'text-embedding-ada-002') {
    content = content
        .split('')
        .filter((char) => char.charCodeAt(0) < 128)
        .join('');
    const response = await openai.createEmbedding({
        model: engine,
        input: content,
    });
    const vector = response.data.data[0].embedding;
    return vector;
}

async function gpt3_completion(prompt, engine = 'gpt-3.5-turbo', temp = 0.0, top_p = 1.0, tokens = 400, freq_pen = 0.0, pres_pen = 0.0) {
    prompt = prompt
        .split('')
        .filter((char) => char.charCodeAt(0) < 128)
        .join('');
    msg = [{
        'role': 'user',
        'content': prompt
    }]
    try {
        const response = await openai.createChatCompletion({
            model: engine,
            messages: msg,
            temperature: temp,
            max_tokens: tokens,
            top_p: top_p,
            frequency_penalty: freq_pen,
            presence_penalty: pres_pen,
        });
        let text = response.data.choices[0].message.content.trim();
        const filename = `${new Date().getTime()}_gpt3.txt`;
        if (!fs.existsSync('gpt3_logs')) {
            fs.mkdirSync('gpt3_logs');
        }
        save_file(`gpt3_logs/${filename}`, `${prompt}\n\n ==========\n\n${text}`);
        return text;
    } catch (oops) {
        console.log(`Error communicating with OpenAI: ${oops}`);
    }
}

function load_conversation(results) {
    const result = [];
    for (let m of results.matches) {
        console.log(m)
        const info = load_json(`nexus/${m.id}.json`);
        result.push(info);
    }
    const ordered = result.sort((a, b) => a.time - b.time);
    const messages = ordered.map((i) => i.message);
    return messages.join('\n').trim();
}

async function main() {
    const convo_length = 30;
    global.fetch = fetch;
    let vdb;
    // Create a client
    const client = new PineconeClient();

    await client.init({
        environment: "us-central1-gcp",
        apiKey: '37624e63-a69c-480d-b64d-48e8359222c8',
    });
    vdb = await client.Index('db-ai')
    async function askQuestion() {
        rl.question('\n\nUSER: ', async (a) => {
            const payload = [];
            const timestamp = Math.floor(Date.now() / 1000);
            const timestring = timestamp_to_datetime(timestamp);
            const message = a;
            const vector = await gpt3_embedding(message);
            const unique_id = uuidv4();
            await save_json(`embeddings_json/${unique_id}.json`, vector)
            const metadata = { speaker: 'USER', time: timestamp, message: message, timestring: timestring, uuid: unique_id };
            await save_json(`nexus/${unique_id}.json`, metadata);
            await payload.push({ id: unique_id, values: vector });
            if (!vector) {
                console.log("Error: Vector is null or undefined");
                return;
            }
            let results;
            try {
                const queryRequest = {
                    topK: convo_length,
                    vector: vector,
                };

                results = await vdb.query({ queryRequest });
            }
            catch (error) {
                console.log("ERROR Pinecone: ", error)
            }




            const conversation = await load_conversation(results);
            const prompt = open_file('prompt_response.txt').replace('<<CONVERSATION>>', conversation).replace('<<MESSAGE>>', a);
            // console.log(prompt)
            let output
            try {
                output = await gpt3_completion(prompt);

            }
            catch (error) {
                console.log(error)
            }
            const timestamp2 = Math.floor(Date.now() / 1000);
            const timestring2 = timestamp_to_datetime(timestamp2);
            const message2 = output;
            const vector2 = await gpt3_embedding(message2);
            const unique_id2 = uuidv4();
            const metadata2 = { speaker: 'RAVEN', time: timestamp2, message: message2, timestring: timestring2, uuid: unique_id2 };
            save_json(`nexus/${unique_id2}.json`, metadata2);
            await payload.push({ id: unique_id2, values: vector2 });
            try {
                let upsertRequest = {
                    vectors: payload
                }
                await vdb.upsert({ upsertRequest });

            }
            catch (error) {
                console.log("\n\n\n\n\n\nvdb upsert error: ", error)
            }
            console.log(`\n\nRAVEN: ${output}`);
        });
    }
    askQuestion();

}

main();
