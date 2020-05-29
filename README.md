[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/punch-cli.svg)](https://npmjs.org/package/punch-cli)
[![Downloads/week](https://img.shields.io/npm/dw/punch-cli.svg)](https://npmjs.org/package/punch-cli)
[![License](https://img.shields.io/npm/l/punch-cli.svg)](https://github.com/rockbender/punch-cli/blob/master/LICENSE)

About this project
=========

A simple CLI tool to track your work session.

# Features

* Track a work session by punching in/out
* Add notes to a shift
* View past shitfs in a tablular format

# Dependency
The application requires npm-gyp to be available. For Windows users, please follow this guide [here](https://www.npmjs.com/package/node-gyp) for installation instructions.

# Feedback
Feel free to leave me feedback at _fewmints@gmail.com_. To report issues, do so at [Github](https://github.com/rockbender/punch-cli/issues).

# Usage
```sh-session
Installing
$ npm install punch-cli -g

Start a new session
$ punch in

End a session
$ punch out

View the current/last session
$ punch status

For available switches and aliases
$ punch --help [COMMAND]
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

display help for punch commands

```
USAGE
  $ punch help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

## `punch in`

Start a new session. Use -f to restart current session.

```
USAGE
  $ punch in

OPTIONS
  -f, --force
  -m, --message=message

ALIASES
  $ punch i
```

## `punch log`

View the list of past sessions.

```
USAGE
  $ punch log

ALIASES
  $ punch l
```

## `punch out`

End the current session.

```
USAGE
  $ punch out

ALIASES
  $ punch o
```

## `punch status`

Shows the currently running session. If an active session is not found then the last session summary is shown.

```
USAGE
  $ punch status

ALIASES
  $ punch s
```

<!-- commandsstop -->
- punch In -- Start a new session. -f to restart current session
- punch out -- End current session
- punch log -- View historical sessions
- punch status -- View the current session or the last session
