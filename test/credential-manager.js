const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const inquirer = require('inquirer');
const CredentialManager = require('../lib/credential-manager');

describe('A credential manager', () => {
  let creds;
   before(() => {
     creds = new CredentialManager('twine-test');
   });
   context('with no existing credentials', () => {
     it('should prompt the user', async () => {
       sinon.stub(inquirer, 'prompt').resolves({key: 'foo', secret: 'bar'});
       let [key, secret] = await creds.getKeyAndSecret();
       expect(key).to.equal('foo')
       expect(secret).to.equal('bar')
       expect(inquirer.prompt.calledOnce).to.be.true
     });
   });
   
   context('with  existing credentials', () => {
     it('should just return credentials', async () => {
       let [key, secret] = await creds.getKeyAndSecret();
       expect(key).to.equal('foo')
       expect(secret).to.equal('bar')
       expect(inquirer.prompt.calledOnce).to.be.false
     });
   });

   after(() => {
     inquirer.prompt.restore();
     creds.conf.delete('apiKey');
     creds.conf.delete('apiSecret');
   });
});
