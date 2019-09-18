#!/usr/bin/env node

const CredentialManager = require('../lib/credential-manager');

async function main() {
  const cred = new CredentialManager('nyana');
  let [key, secret] = await cred.getKeyAndSecret();
  console.log(key, secret)
}

main().catch(console.error);
