#! /usr/bin/env node
const { execSync } = require("child_process");

const runCommand = (command) => {
  try {
    execSync(`${command}`, { stdio: "inherit" });
    return true;
  } catch (e) {
    console.error(chalk.red(`❌ Error!`, e));
    return false;
  }
};

const repoName = process.argv[2];
const setupCommand = `yarn`;
const gitApiCheckoutCommand = `git clone --depth=1 git@github.com:mjmcgrath2010/graphql-api-template.git ${repoName}-api`;
const installCheckoutCommandApi = `cd ${repoName}-api && yarn --silent`;
const setupCommandApi = `cd ${repoName}-api && yarn setup`;

const gitCheckoutCommandWeb = `git clone --depth=1 git@github.com:mjmcgrath2010/material-ui-dashboard-template.git ${repoName}-web`;
const installCheckoutCommandWeb = `cd ${repoName}-web && yarn --silent`;
const setupCommandWeb = `cd ${repoName}-web && yarn setup`;

/**
 * CREATE
 */

const setup = runCommand(setupCommand);
if (!checkoutApi || !checkoutWeb) {
  process.exit(-1);
}
console.log(chalk.blue(`🛠 Creating ${repoName} graphql,express, mongo api.`));
const checkoutApi = runCommand(gitApiCheckoutCommand);
const checkoutWeb = runCommand(gitCheckoutCommandWeb);
if (!checkoutApi || !checkoutWeb || !setup) {
  process.exit(-1);
}
console.log(chalk.green(`✅ ${repoName} created success!`));

/**
 * INSTALL
 */

console.log(chalk.blue(`⬇️ Installing dependencies`));
const installApi = runCommand(installCheckoutCommandApi);
const installWeb = runCommand(installCheckoutCommandWeb);
if (!installApi || !installWeb) {
  process.exit(-1);
}
console.log(chalk.green(`✅ Installing dependencies success!`));

/**
 *  Run Setup
 */

const setupApi = runCommand(setupCommandApi);
const setupWeb = runCommand(setupCommandWeb);

if (!setupApi || !setupWeb) {
  process.exit(-1);
}

console.log(
  chalk.green(`
🎉 Complete!
To get started, run:

cd ${repoName}-web && yarn start
// new terminal
cd ${repoName}-api && yarn dev

🚀🚀🚀🚀
`)
);
