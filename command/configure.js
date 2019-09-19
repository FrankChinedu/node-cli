const inquirer = require('inquirer');
const CredentialManager = require('../lib/credential-manager');
const util = require('../lib/util');

const configure = {
  async consumer(name) {
    let creds = new CredentialManager(name);
    let answer = await inquirer.prompt([
      {
        type: 'input',
        name: 'key',
        message: 'enter you twiter api key',
        validate: util.notEmpty
      },
      {
        type: 'password',
        name: 'secret',
        message: 'enter you twiter api secret',
        validate: util.notEmpty
      }
    ]);
    await creds.storeKeyAndSecret(answer.key, answer.secret);
  }
}

module.exports = configure;
