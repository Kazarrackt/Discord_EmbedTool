//===============================================================
// Name:    Log Handler
// Project: Discord Embed Tool
//===============================================================

// Importing the required modules
const fs = require('fs');
const config = require('../config.json');
const chalk = require('chalk');

// Declare the colors from config
const err_color = config.preferences.colors.error;
const warn_color = config.preferences.colors.warning;
const info_color = config.preferences.colors.info;
const debug_color = config.preferences.colors.debug;
const success_color = config.preferences.colors.success;
const default_color = config.preferences.colors.default;
const process_color = config.preferences.colors.processing;


// check for Logs folder function
function checkLogsFolder() {
    if (!fs.existsSync('../logs')) {
        fs.mkdirSync('../logs');
        // Log to Console
        console.log(chalk.hex(default_color)('Logs folder not found! Creating logs folder...'));
    }
}

// TODO: Add a function to create a new log file after a certain size

// function to write to log file called latest.log in the logs folder and to the console colored by type
function writeToLog(message, type) {
    // Check for the logs folder
    checkLogsFolder();

    // Get the current date and time
    var date = new Date();
    var date_string = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
    var time_string = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

    // Check for the log file
    if (!fs.existsSync('../logs/latest.log')) {
        fs.writeFileSync('../logs/latest.log', '');
    }

    // write to log file
    fs.appendFileSync('../logs/latest.log', '[' + date_string + ' ' + time_string + '] ' + type + ': ' + message + '\n');

    // Log to Console
    switch (type) {
        case 'ERROR':
            console.log(chalk.hex(err_color)('[' + date_string + ' ' + time_string + '] ' + type + ': ' + message));
            break;
        case 'WARNING':
            console.log(chalk.hex(warn_color)('[' + date_string + ' ' + time_string + '] ' + type + ': ' + message));
            break;
        case 'INFO':
            console.log(chalk.hex(info_color)('[' + date_string + ' ' + time_string + '] ' + type + ': ' + message));
            break;
        case 'DEBUG':
            console.log(chalk.hex(debug_color)('[' + date_string + ' ' + time_string + '] ' + type + ': ' + message));
            break;
        case 'SUCCESS':
            console.log(chalk.hex(success_color)('[' + date_string + ' ' + time_string + '] ' + type + ': ' + message));
            break;
        case 'PROCESSING':
            console.log(chalk.hex(process_color)('[' + date_string + ' ' + time_string + '] ' + type + ': ' + message));
            break;
        default:
            console.log(chalk.hex(default_color)('[' + date_string + ' ' + time_string + '] ' + type + ': ' + message));
            break;
    }

    // Return
    return;
}

// Export the functions
module.exports = {
    log: function (message, type) {
        writeToLog(message, type);
    }
}

