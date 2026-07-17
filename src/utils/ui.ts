import chalk from "chalk";

export function title(text: string) {
    console.log();
    console.log(chalk.cyan.bold(text));
    console.log(chalk.gray("────────────────────────────"));
}

export function success(text: string) {
    console.log(chalk.green(text));
}

export function warning(text: string) {
    console.log(chalk.yellow(text));
}

export function error(text: string) {
    console.log(chalk.red(text));
}

export function info(text: string) {
    console.log(chalk.blue(text));
}

export function value(label: string, value: unknown) {
    console.log(
        `${chalk.white(label.padEnd(20))}: ${chalk.green(String(value))}`
    );
}