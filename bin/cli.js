#! /usr/bin/env node
const fs = require("fs-extra");
const path = require("path");
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
const gitCheckoutCommand = `git clone --depth=1 git@github.com:mjmcgrath2010/graphql-api-template.git ${repoName}}`;
const binSrcDir = path.resolve(process.cwd(), "/generators");
const binDestDir = path.resolve(process.cwd(), "`/${repoName}/bin/generators`");
const copyGeneratorsCommand = `mkdir ${path.resolve(
  process.cwd(),
  `/${repoName}/bin/generators`
)} && ${fs.copySync(binSrcDir, binDestDir, {
  overwrite: true,
})}`;
const installCheckoutCommand = `cd ${path.resolve(
  process.cwd(),
  `/${repoName}`
)} && yarn install`;

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
 * COPY
 */

console.log(`⬇️ Cloning copying file generators`);
const copy = runCommand(copyGeneratorsCommand);
if (!copy) {
  process.exit(-1);
}
console.log(`✅ Cloning copying file success!`);

/**
 * INSTALL
 */

console.log(`⬇️ Installing dependencies`);
const install = runCommand(installCheckoutCommand);
if (!install) {
  process.exit(-1);
}
console.log(`✅ Installing dependencies success!`);
