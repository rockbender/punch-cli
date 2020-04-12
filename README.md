punch-cli
=========

Personal work time recording cli app

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/punch-cli.svg)](https://npmjs.org/package/punch-cli)
[![Downloads/week](https://img.shields.io/npm/dw/punch-cli.svg)](https://npmjs.org/package/punch-cli)
[![License](https://img.shields.io/npm/l/punch-cli.svg)](https://github.com/Projects/punch-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g punch-cli
$ punch COMMAND
running command...
$ punch (-v|--version|version)
punch-cli/0.0.0 win32-x64 node-v12.16.1
$ punch --help [COMMAND]
USAGE
  $ punch COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`punch hello [FILE]`](#punch-hello-file)
* [`punch help [COMMAND]`](#punch-help-command)
* [`punch in`](#punch-in)
* [`punch out [FILE]`](#punch-out-file)

## `punch hello [FILE]`

describe the command here

```
USAGE
  $ punch hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ punch hello
  hello world from ./src/hello.ts!
```

_See code: [src\commands\hello.ts](https://github.com/Projects/punch-cli/blob/v0.0.0/src\commands\hello.ts)_

## `punch help [COMMAND]`

display help for punch

```
USAGE
  $ punch help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src\commands\help.ts)_

## `punch in`

```
USAGE
  $ punch in
```

_See code: [src\commands\in.ts](https://github.com/Projects/punch-cli/blob/v0.0.0/src\commands\in.ts)_

## `punch out [FILE]`

describe the command here

```
USAGE
  $ punch out [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src\commands\out.ts](https://github.com/Projects/punch-cli/blob/v0.0.0/src\commands\out.ts)_
<!-- commandsstop -->
