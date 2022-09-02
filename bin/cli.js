#! /usr/bin/env node
const { execSync } = require("child_process");

const runCommand = (command) => {
  try {
    execSync(`${command}`, { stdio: "inherit" });
    return true;
  } catch (e) {
    console.error(`❌ Error!`, e);
    return false;
  }
};

const repoName = process.argv[2];
const gitApiCheckoutCommand = `git clone --depth=1 git@github.com:mjmcgrath2010/graphql-api-template.git ${repoName}-api`;
const installCheckoutCommandApi = `cd ${repoName}-api && yarn install`;
const setupCommandApi = `cd ${repoName}-api && yarn setup`;

const gitCheckoutCommandWeb = `git clone --depth=1 git@github.com:mjmcgrath2010/material-ui-dashboard-template.git ${repoName}-web`;
const installCheckoutCommandWeb = `cd ${repoName}-web && yarn install`;
const setupCommandWeb = `cd ${repoName}-web && yarn setup`;

/**
 * CREATE
 */

console.log(`🛠 Creating ${repoName} graphql,express, mongo api.`);
const checkoutApi = runCommand(gitApiCheckoutCommand);
const checkoutWeb = runCommand(gitCheckoutCommandWeb);
if (!checkoutApi || !checkoutWeb) {
  process.exit(-1);
}
console.log(`✅ ${repoName} created success!`);

/**
 * INSTALL
 */

console.log(`⬇️ Installing dependencies`);
const installApi = runCommand(installCheckoutCommandApi);
const installWeb = runCommand(installCheckoutCommandWeb);
if (!installApi || !installWeb) {
  process.exit(-1);
}
console.log(`✅ Installing dependencies success!`);

/**
 *  Run Setup
 */

const setupApi = runCommand(setupCommandApi);
const setupWeb = runCommand(setupCommandWeb);

if (!setupApi || !setupWeb) {
  process.exit(-1);
}

console.log(`
🎉 Complete!
To get started, run:
cd ${repoName} && yarn start to begin!`);
