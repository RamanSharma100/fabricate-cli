# Fabricate CLI

Fabricate CLI is a Library to create NodeJS CLI applications with ease and
maintainable code.

## Installation

[Release coming soon on NPM.](https://www.npmjs.com/package/fabricate-cli)

## Usage

```typescript
import CLI, { Command, type CommandOption } from 'fabricate-cli';

const cli = new CLI('forge', 'A CLI tool for creating servers');

class CreateServerCommand extends Command {
	constructor() {
		super(
			'create', // command name
			'Create a new server', // command description
			'c', // command shortcut
			// arguments for command
			[
				{
					name: 'name',
					description: 'The name of the server',
					shortcut: 'n',
					value: 'required', // argument value required or not
				},
			],
			// options for command
			[
				{
					name: 'version',
					description: 'The version of the server',
					shortcut: 'v',
					value: 'required', // option value required or not
				},
			]
		);
	}

	async execute(args: CommandOption[], options: CommandOption[]) {
		console.log('Creating server...');
	}
}

cli.addCommand(new CreateServerCommand());

cli.handle();
```

## License

MIT License

## Author

Raman Sharma

## Contributing

Pull requests are welcome. For major changes, please open an issue first to
discuss what you would like to change.

## Support

If you like this project, please give it a star ⭐️.

## Roadmap

- [ ] Add tests
- [ ] Add more documentation
- [ ] Add more examples
- [ ] Add more features
- [x] Reduce File Size (Current: 111 KB)

## Project Status

This project is currently in development. Users are welcome to use it, but be
aware that there may be bugs and missing features.

## Release History

- 0.1.0
  - Level 0 is complete
- 0.2.0
  - Default export is now CLI class

## Contact

Created by [@ramanshsharma100](https://www.ramanshsharma.dev/) - feel free to
contact me!

# Enjoy Coding 🚀
