#!/usr/bin/env node

import chalk from "chalk";

console.clear();

console.log(chalk.cyan.bold(" Dev-Brain"));
console.log(chalk.gray("===================================="));
console.log(chalk.green("Dev-Brain v0.0.1"));
console.log(chalk.white("A CLI tool that understands and analyzes software projects in seconds."));
console.log();
console.log(chalk.yellow("Current Directory:"));
console.log(chalk.white(process.cwd()));
console.log();
console.log(chalk.green(" Status: Ready"));