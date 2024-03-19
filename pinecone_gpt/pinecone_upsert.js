const fs = require('fs');
const { Configuration, OpenAIApi, ChatCompletionRequestMessageRoleEnum } = require("openai");
const { v4: uuidv4 } = require('uuid');
const { PineconeClient } = require("@pinecone-database/pinecone");

const fetch = require('node-fetch');


const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


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


async function main() {
    global.fetch = fetch;
    let vdb;
    // Create a client
    const client = new PineconeClient();

    await client.init({
        environment: process.env.PINECONE_ENVIRONMENT || 'us-west1-gcp',
        apiKey: process.env.PINECONE_API_KEY,
    });
    vdb = await client.Index('custom-ai-chats')
    const vettedRepairShopsJson = require("../../data/vettedRepairShops.json");
    const vetterRepairShops = `vettedRepairShops: ${vettedRepairShopsJson}`


    const vector = await gpt3_embedding(vetterRepairShopsJson);
    
    let payload = [];
    const metadata = {
        role: ChatCompletionRequestMessageRoleEnum.System,
        timestamp: Date.now(),
        content: vetterRepairShops
    }
    await payload.push({
        id: `${uuidv4()}-injectedMemory`,
        values: vector,
        metadata: metadata
    })
    try {
        let upsertRequest = {
            vectors: payload,
            namespace: 'context'
        }
        const upsertResults = await vdb.upsert({ upsertRequest });
        console.log("upsertResults response: ", upsertResults)
    }
    catch (error) {
        console.log("\n\n\n\n\n\nvdb upsert error: ", error)
    }

}

main();
