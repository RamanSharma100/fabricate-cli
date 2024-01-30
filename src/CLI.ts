import chalk from "chalk";
import boxen from "boxen";
import { Command, CommandOption } from "./Command";

class CLI {
  private commands: Command[] = [];

  constructor(
    private readonly cliName: string,
    private readonly cliDescription: string
  ) {}

  public addCommand(command: Command) {
    this.commands.push(command);
  }

  public handle() {
    const args = process.argv.slice(2);

    if (args.length === 0) {
      return this.showHelp();
    }

    const [commandName, ...params] = args;

    const command = this.findCommand(commandName);

    if (!command) {
      this.showHelp();
      return;
    }

    const argsMap = this.parseArgs(command.args, params);

    const optionsMap = this.parseOptions(command.options, params);

    console.log({
      commandName,
      argsMap,
      optionsMap,
    });
  }

  private parseArgs(
    args: CommandOption[],
    params: string[]
  ): { [key: string]: any } {
    const argsMap: { [key: string]: any } = {};

    args.forEach((arg, index) => {
      const param = params[index];
      if (!param && arg.value === "required") {
        return console.log(`Argument ${arg.name} is required`);
      }
      argsMap[arg.name] = param;
    });

    return argsMap;
  }

  private parseOptions(
    options: CommandOption[],
    params: string[]
  ): { [key: string]: any } {
    const optionsMap: { [key: string]: any } = {};
    options.forEach((option) => {
      const optionIndex = params.findIndex(
        (param) =>
          param === `--${option.name.toLowerCase()}` ||
          param === `-${option.shortcut}`
      );
      if (optionIndex > -1) {
        if (option.value === "required" && !params[optionIndex + 1]) {
          console.log(
            chalk.red(
              `Option ${option.name} requires a value. Use ${chalk.bold(
                "--" + option.name.toLowerCase() + " <value>"
              )}`
            )
          );
          process.exit();
        }
        optionsMap[option.name] = params[optionIndex + 1]
          ? isNaN(Number(params[optionIndex + 1]))
            ? params[optionIndex + 1]
            : Number(params[optionIndex + 1])
          : true;
      }
    });

    return optionsMap;
  }

  private findCommand(commandName: string): Command {
    const command = this.commands.find(
      (command) => command.name === commandName || command.alias === commandName
    );

    if (!command) {
      console.log(`Command ${commandName} not found`);
      process.exit();
    }

    return command;
  }

  private showHelp() {
    const argsLength = this.commands
      .map((command: Command) => {
        return command.args.length;
      })
      .reduce((acc, curr) => acc + curr, 0);

    const optionsLength = this.commands
      .map((command: Command) => {
        return command.options.length;
      })
      .reduce((acc, curr) => acc + curr, 0);

    const message = `
${chalk.bold(this.cliName.toLocaleUpperCase())} - ${this.cliDescription}

${chalk.bold("Usage:")}
  ${this.cliName} <command> ${argsLength > 0 ? "[args]" : ""} ${
      optionsLength > 0 ? "[options]" : ""
    }

${chalk.bold("Commands:")}
  ${this.commands
    .map((command: Command) => {
      return `${command.name} ${command.description}`;
    })
    .join("\n")}

${
  argsLength > 0
    ? chalk`
${chalk.bold("Arguments:")}
  ${this.commands
    .map((command: Command) => {
      return command.args
        .map((arg: CommandOption) => {
          return `${arg.name} ${arg.description}`;
        })
        .join("\n");
    })
    .join("\n")}
`
    : ""
}

${
  optionsLength > 0
    ? chalk`
${chalk.bold("Options:")}
  ${this.commands
    .map((command: Command) => {
      return command.options
        .map((option: CommandOption) => {
          return `${option.name} ${option.description}`;
        })
        .join("\n");
    })
    .join("\n")}
`
    : ""
}
`;

    console.log(
      boxen(message.trim(), {
        padding: 1,
        margin: 1,
        borderStyle: "round",
        borderColor: "green",
      })
    );
  }
}

export default CLI;
