import CLI, { Command, type CommandOption } from "../src";

const cli = new CLI("forge", "A CLI tool for creating servers");

class CreateServerCommand extends Command {
  constructor() {
    super(
      "create",
      "Create a new server",
      "c",
      [
        {
          name: "name",
          description: "The name of the server",
          shortcut: "n",
          value: "required",
        },
      ],
      [
        {
          name: "version",
          description: "The version of the server",
          shortcut: "v",
          value: "required",
        },
      ]
    );
  }

  async execute(args: CommandOption[], options: CommandOption[]) {
    console.log("Creating server...");
  }
}

cli.addCommand(new CreateServerCommand());

cli.handle();
