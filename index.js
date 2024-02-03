import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import path from 'path';

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

const nvidiaApiUrl = "https://api.nvcf.nvidia.com/v2/nvcf/pexec/functions/2ae529dc-f728-4a46-9b8d-2697213666d8";
const fetchUrlFormat = "https://api.nvcf.nvidia.com/v2/nvcf/pexec/status/";

const headers = {
    "Authorization": "Bearer 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",
    "Accept": "application/json",
};

app.use(express.json());

app.post("/api", async (req, res) => {
    const userMessage = req.body.messages && req.body.messages[0] && req.body.messages[0].content;

    if (!userMessage) {
        res.status(400).send("Invalid request format. Please provide a user message in the request body.");
        return;
    }

    try {
        let response = await fetch(nvidiaApiUrl, {
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
    } catch (error) {
        console.error(error);
        res.status(500).send("Error processing the request.");
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


