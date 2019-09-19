const configstore = require('configstore');
const inquirer = require('inquirer');

class CredentialManager {
  constructor(name) {
    this.conf = new configstore(name);
  }
  async getKeyAndSecret() {
    let key = this.conf.get('apikey')
    if (key) {
      let secret = this.conf.get('apiSecret');
      return [key, secret]
    } else {
      let answer = await inquirer.prompt([
        { type: 'input', name: 'key', message: 'Enter your key here'},
        { type: 'password', name: 'secret', message: 'Enter your secret'}
      ])
      this.conf.set('apiKey', answer.key);
      this.conf.set('apiSecret', answer.secret);
      return [answer.key, answer.secret]
    }
  }
}

module.exports = CredentialManager;
