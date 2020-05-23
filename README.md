[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/punch-cli.svg)](https://npmjs.org/package/punch-cli)
[![Downloads/week](https://img.shields.io/npm/dw/punch-cli.svg)](https://npmjs.org/package/punch-cli)
[![License](https://img.shields.io/npm/l/punch-cli.svg)](https://github.com/rockbender/punch-cli/blob/master/LICENSE)

About this project
=========

A simple CLI tool to track your work time.

# Features

* Track a work shift by punching in/out
* Add notes to a shift
* View past shitfs in a tablular format

# Usage
```sh-session
$ npm install -g punch-cli
$ punch in
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
* [`punch help [COMMAND]`](#punch-help-command)
* [`punch in`](#punch-in)
* [`punch log`](#punch-log)
* [`punch out`](#punch-out)
* [`punch status`](#punch-status)

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

Start a new work session. Use -f to restart current session.

```
USAGE
  $ punch in

OPTIONS
  -f, --force
```

_See code: [src\commands\in.ts](https://github.com/Projects/punch-cli/blob/v0.0.0/src\commands\in.ts)_

## `punch log`

View the historical sessions.

```
USAGE
  $ punch log
```

_See code: [src\commands\log.ts](https://github.com/Projects/punch-cli/blob/v0.0.0/src\commands\log.ts)_

## `punch out`

End the current session.

```
USAGE
  $ punch out
```

_See code: [src\commands\out.ts](https://github.com/Projects/punch-cli/blob/v0.0.0/src\commands\out.ts)_

## `punch status`

Shows the currently running session. If an active session is not found then the last session summary is shown.

```
USAGE
  $ punch status

OPTIONS
```

_See code: [src\commands\status.ts](https://github.com/Projects/punch-cli/blob/v0.0.0/src\commands\status.ts)_
<!-- commandsstop -->
- punch In -- Start a new session. -f to restart current session
- punch out -- End current session
- punch log -- View historical sessions
- punch status -- View the current session or the last session
