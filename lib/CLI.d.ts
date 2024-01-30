import { Command } from './Command';
declare class CLI {
    private readonly cliName;
    private readonly cliDescription;
    private commands;
    constructor(cliName: string, cliDescription: string);
    addCommand(command: Command): void;
    handle(): void;
    private parseArgs;
    private parseOptions;
    private findCommand;
    private showHelp;
}
export default CLI;
