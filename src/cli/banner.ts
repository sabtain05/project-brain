import chalk from "chalk";

export function showBanner(): void {
  console.clear();

  console.log();

  console.log(chalk.cyan.bold("🧠 QUICKLYZER"));
  console.log(chalk.gray("===================================="));

  console.log(chalk.green("v0.0.2"));
  console.log(chalk.white("Understand any codebase in seconds."));

  console.log();
}