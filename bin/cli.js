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
const gitApiCheckoutCommand = `mkdir ${repoName} && cd ${repoName} && git clone --depth=1 git@github.com:mjmcgrath2010/graphql-api-template.git api`;
const installCheckoutCommandApi = `cd ${repoName}/api && yarn --silent`;
const setupCommandApi = `cd ${repoName}/api && yarn setup`;

const gitCheckoutCommandWeb = `cd ${repoName} && git clone --depth=1 git@github.com:mjmcgrath2010/material-ui-dashboard-template.git web`;
const installCheckoutCommandWeb = `cd ${repoName}/web && yarn --silent`;
const setupCommandWeb = `cd ${repoName}/web && yarn setup`;
const setupCommandRepo = `cd ${repoName} &&
                          yarn init -y &&
                          yarn add -D concurrently &&
                          yarn &&
                          npm set-script start "concurrently \"cd web && yarn start\" \"cd api && yarn start\""`;

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
const setupRepo = runCommand(setupCommandRepo);

if (!setupApi || !setupWeb || !setupRepo) {
  process.exit(-1);
}

console.log(
  `
🎉 Setup Complete!
To get started, run:

> cd ${repoName}
> yarn start

🚀🚀🚀🚀
`
);
