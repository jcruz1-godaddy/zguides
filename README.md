# ZGuides
Generate automatic zoom notes.

## Problem Statement

## Solution

## Business Goal & Cost Analysis
We plan to use chatGPT v3.5 16K Model. Given its maximum token of 16384 characters, it should cover our basic needs for meeting transcript summarization. A 30-minute meeting will generate on average 3000-4000 words, i.e., 16000-18000 characters.
According to the [GoDaddy Caas Platform](https://caas.godaddy.com/prompt/create), the cost is Prompt: $0.003/1K, Result: $0.004/1K. The cost would be around 0.003 * 16 + 0.004*16 = 0.112 per 30-minute meeting.

## Setup
1. Install and homebrew https://brew.sh/.
    <br />
    <br />
2. Install Node.js and npm `brew install node`.
   <br />
   <br />
3. Run `npm install` to download the required packages.
   <br />
   <br />
4. Inside `.env` file, insert values for SLACK_SIGNING_SECRET, SLACK_BOT_TOKEN, SLACK_CHANNEL, and PORT.
   <br />
   <br />
5. Run `npm start` to start the project.