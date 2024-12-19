# sourcefinder

**JavaScript Source Maps Enumeration Tool**

sourcefinder is a tool designed to enumerate JavaScript source maps associated with a given website. Source maps are files that map compressed or minified code back to their original source code, aiding in debugging and understanding the code structure. However, if exposed unintentionally, they can reveal sensitive information about the application's codebase.

## Instalation

Ensure you have Node.js installed. Then, install sourcefinder globally using npm:

```
npm install -g sourcefinder
```

## Usage

```
sourcefinder -h
```

To display the help menu and available options:

```
Usage: sourcefinder [options]

Command-line tool for checking if applications have JavaScript sourcemaps enabled.

Options:
  -V, --version              output the version number
  -u, --url <url>            Specify the target URL to check for sourcemaps
  -f, --file <file>          Provide a file with a list of URLs to check
  -H, --header [headers...]  Use custom request headers
  -h, --help                 display help for command

Examples:
  $ sourcefinder -u https://example.com
  $ sourcefinder -f urls.txt -H "User-Agent: any-user-agent"
```

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your changes. Ensure that your code adheres to the project's coding standards and includes appropriate tests.

## License
This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## Acknowledgments
sourcefinder is inspired by the need to enhance web application security by identifying exposed source maps that could potentially leak sensitive information. Special thanks to the open-source community for their invaluable contributions and support.

For more information and to access the source code, visit the [sourcefinder GitHub repository](https://github.com/marcotuliocnd/sourcefinder).

