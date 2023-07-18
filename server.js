const express = require('express');
const multer = require('multer');
const cors = require('cors');
const Slack = require('@slack/bolt');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config()

const slackBot = new Slack.App({
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    token: process.env.SLACK_BOT_TOKEN,
});

const app = express();

app.use(cors());

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, '../public/uploads/')
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname )
//     }
// })

const upload = multer({dest: 'uploads/'})

app.get('/', (req, res) => {
    res.send('We are live');
});

app.post("/upload", upload.single("file"), async (req, res) => {

    try {

        if (req.file) {
            // console.log("Body: ", req.body);
            // console.log("File: ", req.file);
            var fs = require('fs');
            var fileContent = "";
            fs.readFile(req.file.path, await function (err, data) {
                if (err) throw err;
                fileContent = data.toString();
                
                let req_data = JSON.stringify({
                    "prompt": `summarize the zoom meeting transcript in bullet points - ${fileContent}`,
                    "provider": "openai_chat",
                    "providerOptions": {
                        "model": "gpt-3.5-turbo"
                    }
                });

                let hostConfig = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: 'https://caas.api.test-godaddy.com/v1/prompts',
                    headers: {
                        'accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'sso-jwt eyJhbGciOiAiUlMyNTYiLCAia2lkIjogImlhQVh5bVlqeWcifQ.eyJhdXRoIjogImJhc2ljIiwgImZ0YyI6IDIsICJpYXQiOiAxNjg5NjMwNjMyLCAianRpIjogIklFZ1o0bExRM055SWJjWVBiYnUyaVEiLCAidHlwIjogImpvbWF4IiwgInZhdCI6IDE2ODk2MzA2MzIsICJmYWN0b3JzIjogeyJrX2ZlZCI6IDE2ODk2MzA2MzIsICJwX29rdGEiOiAxNjg5NjMwNjMyfSwgImN0eCI6ICIiLCAiYWNjb3VudE5hbWUiOiAia3pob3UxIiwgInN1YiI6ICI0MzIyODAiLCAidXR5cCI6IDEwMSwgImdyb3VwcyI6IFtdfQ.NT-uBXlLckvD0Vplr7NqjGSTIJPAEYlA9wOXFJJ-z3HjlyJdj1YYvy_XE1llrhgJa9niIAgZ3UwCsS40lkXOhgTM5xwEAwLaS4FphpBG4KpzguDfOyCMxNEHIO-_d-wybaE6uTIlyyMZEsfgOoe2XafgKu-jyd97mdy72ME3pEJKWRbc8k27OuFhz9bMfqc1N0VZuviZgpiZrGU2ht_08DMXhnfAem1m5AskVs9PHWYsaVhcmv37Y519z5OZSyQPN3zRl3Ek4G5qPIGAPBTzM46Z5ZvRgPS-Roa6RM3PEa80QQdV-VgwaYqKPRWzYmL7e_O20rrpAaLeg3mBuqbUBQ'
                    },
                    data: req_data
                }

                axios.request(hostConfig)
                    .then((response) => {
                        const json = JSON.stringify(response.data);
                        const textContent = JSON.parse(json).data.value;
                        // console.log(textContent);
                        // console.log(JSON.parse(JSON.stringify(response.data)).value);

                        const userId = "U05H1D0LNB1";
                        const result = slackBot.client.chat.postMessage({
                            token: process.env.SLACK_BOT_TOKEN,
                            channel: userId,
                            as_user: true,
                            text: textContent,
                        }).then(() => {
                            res.send('Meeting notes sent successfully!')
                        }).catch(() => {
                            res.send('Sent failed!')
                        })
                    })
                    .catch((error) => {
                        console.log(error);
                    });

                // res.send({
                //     status: true,
                //     message: "File Uploaded!",
                // });
            });
        } else {
            res.status(400).send({
                status: false,
                data: "File Not Found :(",
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

// app.post('/upload', function(req, res) {
//
//     upload(req, res, function (err) {
//         if (err instanceof multer.MulterError) {
//             return res.status(500).json(err)
//         } else if (err) {
//             return res.status(500).json(err)
//         }
//         return res.status(200).send(req.file)
//     })
//
// });

app.listen(3001, () => {
    console.log('Listing on port 3001');
});