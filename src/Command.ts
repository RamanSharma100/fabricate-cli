export type CommandOption = {
  name: string;
  description: string;
  shortcut: string;
  value: "required" | "optional";
};

export abstract class Command {
  constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly alias: string,
    public readonly args: CommandOption[] = [],
    public readonly options: CommandOption[] = []
  ) {}

  abstract execute(
    args: CommandOption[],
    options: CommandOption[]
  ): Promise<void>;
}
