const chalk = require('chalk');
const request = require('./request');

const VERSION = '1.0.0';

const { log } = console;

const important = chalk.bold.yellow;
const { green, red } = chalk;


/**
 * Show detail information about current module
 */
const informationLog = () => {
  const INFO = `
${important('Description:')}
  Displays help for a command

${important('Options:')}
  ${green('-h, --help')}      Display this help message
  
  ${green('-V, --version')}   Display this application version
  
  ${green('-u, --url')}       Display information about site
  
  ${green('-f, --file')}      Parse all links from file csv (first column)\n\t\t  and create new file with information about each web site\n\t\t  Please put the full path to file
                  
  `;
  log(INFO);
};

/**
 * Show version of current module
 */
const versionInfo = () => {
  log(chalk.red(VERSION));
};

const url = (link) => {
  request(link)
    .then((resp) => console.log(resp))
    .catch((err) => console.log(err));
};

/**
 * Entry point to
 * @param {Object} command
 */
const consoleCommand = (command) => {
  if (command.help || command.h) {
    return informationLog();
  }

  if (command.V || command.version) {
    return versionInfo();
  }

  if (command.u || command.url) {
    const link = command.u || command.url;
    return url(link);
  }

  if (command.f || command.file) {
    const file = command.f || command.file;

    if (typeof file !== 'string') {
      return log(red('Bad path to file'));
    }
    return log(file, typeof file);
  }

  return log(red('Please, choose the correct command. For this use the command -h'));
};

module.exports = {
  cmd: consoleCommand,
};
