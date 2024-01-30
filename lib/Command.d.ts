export type CommandOption = {
    name: string;
    description: string;
    shortcut: string;
    value: 'required' | 'optional';
};
export declare abstract class Command {
    readonly name: string;
    readonly description: string;
    readonly alias: string;
    readonly args: CommandOption[];
    readonly options: CommandOption[];
    constructor(name: string, description: string, alias: string, args?: CommandOption[], options?: CommandOption[]);
    abstract execute(args: {
        [key: string]: any;
    }, options: {
        [key: string]: any;
    }): Promise<void>;
}
