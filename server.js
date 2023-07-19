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

const upload = multer({dest: 'uploads/'})

app.get('/', (req, res) => {
    res.send('We are live');
});

app.post("/upload", upload.single("file"), async (req, res) => {

    try {

        // if (req.file) {
        const file = req.file;
        const channelId = req.body.channelId;
        console.log("channelId: ", channelId);

        var fs = require('fs');
        var fileContent = "";
        fs.readFile(file.path, await function (err, data) {
            if (err) throw err;
            fileContent = data.toString();

            let req_data = JSON.stringify({
                "prompt": `summarize the zoom meeting transcript in bullet points - ${fileContent}`,
                "provider": "openai_chat",
                "providerOptions": {
                    "model": "gpt-3.5-turbo"
                }
            });

            const auth_jomax = process.env.AUTH_JOMAX;
            let hostConfig = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://caas.api.test-godaddy.com/v1/prompts',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `sso-jwt ${auth_jomax}`
                },
                data: req_data
            }

            axios.request(hostConfig)
                .then((response) => {
                    const json = JSON.stringify(response.data);
                    const textContent = JSON.parse(json).data.value;
                    // console.log(JSON.parse(JSON.stringify(response.data)).value);
                    const blocks = [
                        {
                            "type": "header",
                            "text": {
                                "type": "plain_text",
                                "text": "Meeting Summarization",
                                "emoji": true
                            }
                        },
                        {
                            "type": "divider"
                        },
                        {
                            "type": "section",
                            "text": {
                                "type": "mrkdwn",
                                "text": `${textContent}`
                            }
                        }
                    ];

                    const result = slackBot.client.chat.postMessage({
                        token: process.env.SLACK_BOT_TOKEN,
                        channel: channelId,
                        as_user: true,
                        blocks: blocks
                    }).then(() => {
                        res.send('File Uploaded!')
                    }).catch(() => {
                    })
                })
                .catch((error) => {
                    console.log(error);
                });
            // }
            res.send({
                status: true,
                message: "Meeting notes summarized!",
            });
        });
        // } else {
        //     res.status(400).send({
        //         status: false,
        //         data: "File Not Found :(",
        //     });
        // }
        // console.log(JSON.stringify(req));
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