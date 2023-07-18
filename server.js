const express = require('express');
const multer = require('multer');
const cors = require('cors');
const Slack = require('@slack/bolt')
const dotenv = require('dotenv')

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

const upload = multer({ dest: 'uploads/' })

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
            fs.readFile(req.file.path, function(err, data) {
                if(err) throw err;
                fileContent = data.toString();
                // for(i in array) {
                //     console.log(array[i]);
                // }
            });

            const userId = "U05H1D0LNB1";
            const result = await slackBot.client.chat.postMessage({
                token: process.env.SLACK_BOT_TOKEN,
                channel: userId,
                as_user: true,
                text: "test",
            }).then(() => {
                res.send('Meeting notes sent successfully!')
            }).catch(() => {
                res.send('Sent failed!')
            })

            // res.send({
            //     status: true,
            //     message: "File Uploaded!",
            // });
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