const fs = require('fs');
const path = require('path');
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const inquirer = require('inquirer');
const dirtyChai = require('dirty-chai');
const configure = require('../../command/configure');
const CredentialManager = require('../../lib/credential-manager');

chai.use(dirtyChai);

describe('the configure module', () => {
  let creds;
  before(() => {
    creds = new CredentialManager('nyana-test');
  });
  it('should add credentials when none are found',  async () => {
    sinon.stub(inquirer, 'prompt').resolves({key: 'one', secret: 'two'})
    await configure.consumer('twine-test')
    let [key, secret] = await creds.getKeyAndSecret();
    expect(key).to.equal('one');
    expect(secret).to.equal('two');
    expect(inquirer.prompt.calledOnce).to.be.true();
    inquirer.prompt.restore();
  });
  it('should overwrite existing credentials', async () => {
    sinon.stub(inquirer, 'prompt').resolves({key: 'three', secret: 'four'})
    await configure.consumer('twine-test')
    let [key, secret] = await creds.getKeyAndSecret();
    expect(key).to.equal('three');
    expect(secret).to.equal('four');
    expect(inquirer.prompt.calledOnce).to.be.true();
    inquirer.prompt.restore();
  });

  after((done) => {
    fs.unlink(path.join(process.env.HOME, '.config', 'configstore', 'nyana-test.json'), done);
  });
});
