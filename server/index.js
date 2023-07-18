const express = require('express')
const bodyParser = require('body-parser');
const Slack = require('@slack/bolt')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({extended: false});

const PORT = process.env.PORT;

app.get('/', (req, res) => {
    res.render('index.ejs');
})

const slackBot = new Slack.App({
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    token: process.env.SLACK_BOT_TOKEN,
});

app.post('/form-submit', urlencodedParser, async (req, res) => {
    const userId = req.body.channelId;
    const result = await slackBot.client.chat.postMessage({
        token: process.env.SLACK_BOT_TOKEN,
        channel: userId,
        as_user: true,
        text: "try."
    }).then(() => {
        res.send('Meeting notes sent successfully!')
    }).catch(() => {
        res.send('Sent failed!')
    })
})

app.listen(PORT, () => {
    console.log(`ZGuides server listening on port ${PORT}!`)
})