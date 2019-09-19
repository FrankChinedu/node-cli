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
      throw new Error('Api key not found');
    }
    let secret = await keytar.getPassword(this.service, key);
    return [key, secret]
  }

  async storeKeyAndSecret(key, secret) {
    this.conf.set('apiKey', key);
    await keytar.setPassword(this.service, key, secret);
  }

  async clearKeyandSecret() {
    let key = this.conf.get('apiKey');
    this.conf.delete('apiKey');
    await keytar.deletePassword(this.service, key);
  }
}

module.exports = CredentialManager;
