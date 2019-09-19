const fs = require('fs');
const path = require('path');
const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
const dirtyChai = require('dirty-chai');
const CredentialManager = require('../../lib/credential-manager');

chai.use(chaiAsPromised);
chai.use(dirtyChai);

describe('A credential manager', () => {
  let creds;
   before(() => {
     creds = new CredentialManager('nyana-test');
   });
   it('should return credentials when they are found', async () => {
     await creds.storeKeyAndSecret('foo', 'bar');
     let [key, secret] = await creds.getKeyAndSecret();
     expect(key).to.equal('foo');
     expect(secret).to.equal('bar');
   });

   it('should reject when np credentials are found',  async () => {
     await creds.clearKeyandSecret();
     expect(creds.getKeyAndSecret()).to.be.rejected();
   });

   after((done) => {
     fs.unlink(path.join(process.env.HOME, '.config', 'configstore', 'nyana-test.json'), done);
   });
});
