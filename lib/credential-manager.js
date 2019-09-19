const configstore = require('configstore');
const inquirer = require('inquirer');
const keytar = require('keytar-prebuild');

class CredentialManager {
  constructor(name) {
    this.conf = new configstore(name);
    this.service = name;
  }
  async getKeyAndSecret() {
    let key = this.conf.get('apikey')
    if (key) {
      let secret = await keytar.getPassword(this.service, key);
      return [key, secret]
    } else {
      let answer = await inquirer.prompt([
        { type: 'input', name: 'key', message: 'Enter your key here'},
        { type: 'password', name: 'secret', message: 'Enter your secret'}
      ])
      this.conf.set('apiKey', answer.key);
      await keytar.setPassword(this.service, answer.key, answer.secret);
      return [answer.key, answer.secret]
    }
  }

  async clearKeyandSecret() {
    let key = this.conf.get('apiKey');
    this.conf.delete('apiKey');
    await keytar.deletePassword(this.service, key);
  }
}

module.exports = CredentialManager;
