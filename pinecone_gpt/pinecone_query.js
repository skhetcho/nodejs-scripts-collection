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
    const convo_length = 1000;
    global.fetch = fetch;
    let vdb;
    // Create a client
    const client = new PineconeClient();

    await client.init({
        environment: process.env.PINECONE_ENVIRONMENT || 'us-west1-gcp',
        apiKey: process.env.PINECONE_API_KEY,
    });
    vdb = await client.Index('db-ai')

    const vector = await gpt3_embedding("a");

    let results;
    try {
        const queryRequest = {
            topK: convo_length,
            // includeMetadata: true,
            // includeValues: true,
            vector: vector,
            namespace: process.env.PINECONE_NAMESPACE || 'db-ai',
            // filter: {
            //     all: { $in: ['true'] }
            // }
        };

        results = await vdb.query({ queryRequest });
        let ids = [];
        await results.matches.map(item => {
            ids.push(item.id)
        })
        console.log("count: ", ids.length)
        console.dir(ids, { depth: null })
        for (const vectorId of ids) {
            vdb.delete1([], true, process.env.PINECONE_NAMESPACE || 'db-ai');
        }
        //   console.log(`Deleted ${vectorIds.length} vectors from the index.`);

    }
    catch (error) {
        console.log("ERROR Pinecone: ", error)
    }

}

main();
