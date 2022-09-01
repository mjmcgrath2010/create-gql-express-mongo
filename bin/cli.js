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
const gitCheckoutCommand = `git clone --depth=1 git@github.com:mjmcgrath2010/graphql-api-template.git ${repoName}`;
const installCheckoutCommand = `cd ${repoName} && yarn install`;
const setupCommand = `yarn setup`;

/**
 * CREATE
 */

console.log(`🛠 Creating ${repoName} graphql,express, mongo api.`);
const checkout = runCommand(gitCheckoutCommand);
if (!checkout) {
  process.exit(-1);
}
console.log(`✅ ${repoName} created success!`);

/**
 * INSTALL
 */

console.log(`⬇️ Installing dependencies`);
const install = runCommand(installCheckoutCommand);
if (!install) {
  process.exit(-1);
}
console.log(`✅ Installing dependencies success!`);

/**
 *  Run Setup
 */

const setup = runCommand(setupCommand);

if (!setup) {
  process.exit(-1);
}

console.log("run `yarn dev` to get started!");
