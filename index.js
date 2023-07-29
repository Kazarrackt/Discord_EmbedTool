//=============================================================
// Project:   Discord Embed Tool
// Author:    Kaz Sorensen
// Date:      29/07/2023
// Version:   1.0.0
//=============================================================

// Importing the required modules
const Discord = require('discord.js');
const fs = require('fs');
const config = require('./config.json');

// Check for the config file
if (!fs.existsSync('./config.json')) {
    // Create Windows pop up message
    const { exec } = require('child_process');
    exec('msg * Config file not found! Please create a config.json file.', (err, stdout, stderr) => {
        if (err) {
            console.log(err);
            return;
        }
    });
    // Log to Console
    console.log('Config file not found! Please create a config.json file.');

    // Exit the process
    process.exit(1);
}

// Import Log Handler
const log = require('./utils/log.js');

// Initialize bot
// Check for token
if (!config.token) {
    // Create Windows pop up message
    const { exec } = require('child_process');
    exec('msg * Token not found! Please add your token to the config.json file.', (err, stdout, stderr) => {
        if (err) {
            console.log(err);
            return;
        }
    });
    // Log
    log.writeToLog('Token not found! Please add your token to the config.json file.', 'ERROR');

    // Exit the process
    process.exit(1);
}

// Initialize Error Handler
const error = require('./utils/error.js');


