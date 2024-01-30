var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import chalk from 'chalk';
import boxen from 'boxen';
var CLI = /** @class */ (function () {
    function CLI(cliName, cliDescription) {
        this.cliName = cliName;
        this.cliDescription = cliDescription;
        this.commands = [];
    }
    CLI.prototype.addCommand = function (command) {
        this.commands.push(command);
    };
    CLI.prototype.handle = function () {
        var args = process.argv.slice(2);
        if (args.length === 0) {
            return this.showHelp();
        }
        var commandName = args[0], params = args.slice(1);
        var command = this.findCommand(commandName);
        if (!command) {
            this.showHelp();
            return;
        }
        var argsMap = this.parseArgs(command.args, params);
        var optionsMap = this.parseOptions(command.options, params);
        command.execute(argsMap, optionsMap);
    };
    CLI.prototype.parseArgs = function (args, params) {
        var argsMap = {};
        args.forEach(function (arg, index) {
            var param = params[index];
            if (!param && arg.value === 'required') {
                return console.log("Argument ".concat(arg.name, " is required"));
            }
            argsMap[arg.name] = param;
        });
        return argsMap;
    };
    CLI.prototype.parseOptions = function (options, params) {
        var optionsMap = {};
        options.forEach(function (option) {
            var optionIndex = params.findIndex(function (param) {
                return param === "--".concat(option.name.toLowerCase()) ||
                    param === "-".concat(option.shortcut);
            });
            if (optionIndex > -1) {
                if (option.value === 'required' && !params[optionIndex + 1]) {
                    console.log(chalk.red("Option ".concat(option.name, " requires a value. Use ").concat(chalk.bold('--' + option.name.toLowerCase() + ' <value>'))));
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
    };
    CLI.prototype.findCommand = function (commandName) {
        var command = this.commands.find(function (command) { return command.name === commandName || command.alias === commandName; });
        if (!command) {
            console.log("Command ".concat(commandName, " not found"));
            process.exit();
        }
        return command;
    };
    CLI.prototype.showHelp = function () {
        var argsLength = this.commands
            .map(function (command) {
            return command.args.length;
        })
            .reduce(function (acc, curr) { return acc + curr; }, 0);
        var optionsLength = this.commands
            .map(function (command) {
            return command.options.length;
        })
            .reduce(function (acc, curr) { return acc + curr; }, 0);
        var message = "\n".concat(chalk.bold(this.cliName.toLocaleUpperCase()), " - ").concat(this.cliDescription, "\n\n").concat(chalk.bold('Usage:'), "\n  ").concat(this.cliName, " <command> ").concat(argsLength > 0 ? '[args]' : '', " ").concat(optionsLength > 0 ? '[options]' : '', "\n\n").concat(chalk.bold('Commands:'), "\n  ").concat(this.commands
            .map(function (command) {
            return "".concat(command.name, " ").concat(command.description);
        })
            .join('\n'), "\n\n").concat(argsLength > 0
            ? chalk(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n", "\n  ", "\n"], ["\n", "\n  ", "\n"])), chalk.bold('Arguments:'), this.commands
                .map(function (command) {
                return command.args
                    .map(function (arg) {
                    return "".concat(arg.name, " ").concat(arg.description);
                })
                    .join('\n');
            })
                .join('\n')) : '', "\n\n").concat(optionsLength > 0
            ? chalk(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n", "\n  ", "\n"], ["\n", "\n  ", "\n"])), chalk.bold('Options:'), this.commands
                .map(function (command) {
                return command.options
                    .map(function (option) {
                    return "".concat(option.name, " ").concat(option.description);
                })
                    .join('\n');
            })
                .join('\n')) : '', "\n");
        console.log(boxen(message.trim(), {
            padding: 1,
            margin: 1,
            borderStyle: 'round',
            borderColor: 'green',
        }));
    };
    return CLI;
}());
export default CLI;
var templateObject_1, templateObject_2;
