#!/usr/bin/env node

const { program } = require('commander')
const path = require('path')
const fs = require('fs')
const { version } = require('../package.json')
const { javascriptExtractor } = require('./javascript-extractor')
const { sourcemapDetector } = require('./sourcemap-detector')

const asciiArt = `
   _                            __ _           _           
  (_)___ _ __ ___   __ _ _ __  / _(_)_ __   __| | ___ _ __ 
  | / __| '_ \` _ \ / _\` | '_ \| |_| | '_ \ / _\` |/ _ \ '__|
  | \__ \ | | | | | (_| | |_) |  _| | | | | (_| |  __/ |   
 _/ |___/_| |_| |_|\__,_| .__/|_| |_|_| |_|\__,_|\___|_|   
|__/                    |_|                               
`

console.log(asciiArt)

program
  .name('jsmapfinder')
  .description('Command-line tool for checking if applications have JavaScript sourcemaps enabled.')
  .version(version)
  .option('-u, --url <url>', 'Specify the target URL to check for sourcemaps')
  .option('-f, --file <file>', 'Provide a file with a list of URLs to check')
  .option('-H, --header [headers...]', 'Use custom request headers')

program.on('--help', () => {
  console.log('\nExamples:')
  console.log('  $ jsmapfinder -u https://example.com')
  console.log('  $ jsmapfinder -f urls.txt -H "User-Agent: any-user-agent"')
})


const main = async () => {
  program.parse(process.argv)

  const options = program.opts()

  if (!Object.keys(options).length) {
    program.help()
    process.exit(1);
  }

  const urls = []

  if (options.url) {
    urls.push(options.url)
  }

  if (options.file) {
    const filePath = path.resolve(options.file);
    if (!fs.existsSync(filePath)) {
      console.error('File not found:', filePath);
      process.exit(1);
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    urls.push(...fileContent.split('\n').filter(line => line.trim()));
  }

  if (!urls.length) {
    console.log('No targets provided!')
    process.exit(1);
  }

  let hasFoundAny = false

  for (const url of urls) {
    try {
      const scripts = await javascriptExtractor(url, options.header)
      for (const script of scripts) {
        const isEnabled = await sourcemapDetector(script, options.header)
        if (isEnabled) {
          hasFoundAny = true
          const message = `[\x1b[32msourcemap-enabled\x1b[0m] ${url}`
          console.log(message)
          break
        }
      }
    } catch (error) {
      continue 
    }
  }

  if (!hasFoundAny) {
    console.log('No results found! Better luck next time')
  }
}

main()

