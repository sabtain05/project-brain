import chalk from "chalk";

export function showBanner(): void {
  console.clear();

  console.log(chalk.cyan.bold(" QUICKLYZER "));
  console.log(chalk.gray("===================================="));
  console.log(chalk.green("Quicklyzer v0.0.2"));
  console.log(
    chalk.white(
      "A CLI tool that understands and analyzes software projects in seconds."
    )
  );
  console.log();
}