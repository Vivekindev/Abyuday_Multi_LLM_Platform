import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import path from 'path';

import pushToDb from './functions/db.js';
import getIST from './functions/getIST.js'
const __dirname = path.resolve();

const app = express();
const port = process.env.PORT || 8080; // Choose the port you want to use
app.use(cors());

app.use(express.static(path.join(__dirname,"./client/dist")));
app.get('*',function(_,res){
    res.sendFile(path.join(__dirname, "./client/dist/index.html"), function(err){
res.status(500).send(err);
    })
})

const llmModels = {
 "Mixtral8x7BInstruct" : "https://api.nvcf.nvidia.com/v2/nvcf/pexec/functions/8f4118ba-60a8-4e6b-8574-e38a4067a4a3",
 "Mistral7BInstruct" : "https://api.nvcf.nvidia.com/v2/nvcf/pexec/functions/35ec3354-2681-4d0e-a8dd-80325dcf7c63",
 "Llama270B"  : "https://api.nvcf.nvidia.com/v2/nvcf/pexec/functions/0e349b44-440a-44e1-93e9-abe8dcb27158",
 "CodeLlama70B" : "https://api.nvcf.nvidia.com/v2/nvcf/pexec/functions/2ae529dc-f728-4a46-9b8d-2697213666d8",
 "CodeLlama34B" : "https://api.nvcf.nvidia.com/v2/nvcf/pexec/functions/df2bee43-fb69-42b9-9ee5-f4eabbeaf3a8",
 "CodeLlama13B" : "https://api.nvcf.nvidia.com/v2/nvcf/pexec/functions/f6a96af4-8bf9-4294-96d6-d71aa787612e",
 "NVLlama270BRLHF" : "https://api.nvcf.nvidia.com/v2/nvcf/pexec/functions/7b3e3361-4266-41c8-b312-f5e33c81fc92",
 "NVLlama270BSteerLMChat" : "https://api.nvcf.nvidia.com/v2/nvcf/pexec/functions/d6fe6881-973a-4279-a0f8-e1d486c9618d"
}
const fetchUrlFormat = "https://api.nvcf.nvidia.com/v2/nvcf/pexec/status/";

const headers = {
    "Authorization": "Bearer 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",
    "Accept": "application/json",
};

app.use(express.json());

app.post("/api/:modelName", async (req, res) => {
    const userMessage = req.body.messages && req.body.messages[0] && req.body.messages[0].content;
    const model = req.params.modelName;
    if (!userMessage) {
        res.status(400).send("Invalid request format. Please provide a user message in the request body.");
        return;
    }
   

    try {
        let response = await fetch(llmModels[model], {
            method: "post",
            body: JSON.stringify({ messages: [{ content: userMessage, role: "user" }], ...req.body }),
            headers: { "Content-Type": "application/json", ...headers }
        });

        while (response.status === 202) {
            const requestId = response.headers.get("NVCF-REQID");
            const fetchUrl = fetchUrlFormat + requestId;
            response = await fetch(fetchUrl, {
                method: "get",
                headers: headers
            });
        }

        if (response.status !== 200) {
            const errBody = await (await response.blob()).text();
            throw `Invocation failed with status ${response.status}: ${errBody}`;
        }

        const responseBody = await response.json();
        res.json(responseBody["choices"][0]["message"]["content"]);
        pushToDb(userMessage,responseBody["choices"][0]["message"]["content"],getIST());
    } catch (error) {
        console.error(error);
        res.status(500).send("Error processing the request.");
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


