#!/usr/bin/env node

require('dotenv').config();
const fs = require('fs');
const ora = require('ora');
const async_process = require('child_process');
const yargs = require('yargs')
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const {
    IamAuthenticator
} = require('ibm-watson/auth');
const {
    promise
} = require('ora');


const file = 'audio'

// Hide warnings https://github.com/nodejs/node/issues/30810
process.removeAllListeners('warning')

const argv = yargs
    .command('speak', 'Synthesizes text and playbacks audio.', {
        text: {
            description: 'Text to convert.',
            alias: 't',
            type: 'string',
        }
    })
    .option('persona', {
        alias: 'p',
        description: 'Use a different persona for the voice.',
        type: 'string',
    })
    .help()
    .alias('help', 'h')
    .argv;

    const spinner = ora().start()
if (argv._.includes('speak')) {
    
    const {text, persona} = argv
    if (argv.text) {
        const {
            TEXT_TO_SPEECH_APIKEY,
            TEXT_TO_SPEECH_URL
        } = process.env

        const textToSpeech = new TextToSpeechV1({
            authenticator: new IamAuthenticator({
                apikey: TEXT_TO_SPEECH_APIKEY,
            }),
            serviceUrl: TEXT_TO_SPEECH_URL,
        });

        const synthesizeParams = {
            text: `<prosody pitch="default" rate="-0%">${text}</prosody>`,
            accept: 'audio/wav',
            voice: persona || 'en-US_MichaelV3Voice',
        };

        spinner.text = 'Synthesizing request...'
        textToSpeech.synthesize(synthesizeParams)
            .then(response => {
                // only necessary for wav formats,
                // otherwise `response.result` can be directly piped to a file
                return textToSpeech.repairWavHeaderStream(response.result);
            })
            .then(buffer => {
                fs.writeFileSync(`${file}.wav`, buffer)
                spinner.text = 'Synthesizing complete!'
            })
            .then(
                async () => {
                    spinner.text = 'Now Playing...'
                    var child
                    switch (process.platform) {
                        case 'win32':
                            child = async_process.exec(`start wmplayer ${file}.wav`)
                            break;
                        case 'linux':
                            child = async_process.exec(`play ${file}.wav`)
                            break;
                        default:
                            child = async_process.exec(`play ${file}.wav`)
                            break;
                    }
                    child.stdout.pipe(process.stdout)
                    child.on('exit', function () {
                        spinner.text = 'Done!'
                        spinner.succeed()
                        process.exit()
                    })
                }
            )
            .catch(err => {
                console.log('error:', err);
            });
    } else {
        console.log("Error: Missing text. Please try again.")
        spinner.stop()
    }
} else {
    console.log("Error: Please enter a command. Use -h for a list of commands.")
    spinner.stop()
}
