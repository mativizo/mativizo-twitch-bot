# mativizo-twitch-bot

Mativizo Twitch Bot 🤖 - WIP!

This is Twitch Bot prepared especially for my streams [Mativizo on Twitch](https://twitch.tv/mativizo), but you can use it if you feel like it's worth it. I'm streaming in polish, but if you want to say hello, you're more than welcome! 😅


## .env file
You can change language (and other settings) in .env file:

```
# Your bot account Twitch Auth Token
TWITCH_AUTH_TOKEN=oauth:ABCDE12345

# Your bot account Twitch username
TWITCH_USERNAME=BOTUSERNAME

# Your own Twitch username
TWITCH_TARGET_CHANNEL=MYUSERNAME

# Language (pl or en)
LANG=pl

# Commands prefix
PREFIX=!
```

## Setup

Still work in progress.

1. Go to [https://twitchapps.com/tmi/](https://twitchapps.com/tmi/) and generate OAuth.
2. Setup `.env` file.
3. Install packages with `npm install`.
4. Run `npm start`.
5. Enjoy your streams! ❤

## Commands

### Streamer

#### Greetings

- `!greetings add trigger <trigger>` - add trigger phrase for greetings, e.g. `!greetings add trigger hola`.
- `!greetings add response <response>` - add response phrase for greetings, e.g. `!greetings add response Nice to see you!`
- `!greetings list triggers` - sends list of all triggers with ids.
- `!greetings list responses` - sends list of all responses with ids.
- `!greetings remove trigger <id>` - removes trigger with specified id.
- `!greetings remove response <id>` - removes response with specified id.

#### Goodbyes

- `!goodbyes add trigger <trigger>` - add trigger phrase for goodbyes, e.g. `!goodbyes add trigger hola`.
- `!goodbyes add response <response>` - add response phrase for goodbyes, e.g. `!goodbyes add response Nice to see you!`
- `!goodbyes list triggers` - sends list of all triggers with ids.
- `!goodbyes list responses` - sends list of all responses with ids.
- `!goodbyes remove trigger <id>` - removes trigger with specified id.
- `!goodbyes remove response <id>` - removes response with specified id.
- `!reload` - reloads command files.

- **WIP** `!role create <role>` - creates new role.
- **WIP** `!role remove <role>` - removes role (can't remove sumermod and regular).
- **WIP** `!role grant <user> <role>` - assigns user a role (supermod or regular).
- **WIP** `!role takeaway <user> <role>` - removes assigned role from user (supermod or regular).
- **WIP** `!role list <role>` - shows special roles and users.


### Super Moderators

- **WIP** `!stream game <game name>` - set streaming category.
- **WIP** `!stream title <stream title>` - set stream title.
- **WIP** `!stream ad` - activate ad.
- **WIP** `!stream marker <text>` - add marker with comment.
- **WIP** `!stream clip <durationinseconds>` - create clip (duration default 30).




### Moderators

### All users

- `!help <commandName>` - shows info about command e.g. `!help ping`.
- `!lurk` - inform streamer about going to lurk.
- `!cmds` - shows all available commands.

- **WIP** `!followage <?username>` - shows own or specified user followage.
- **WIP** `!watchtime <?username>` - shows own or specified user watch time.
- **WIP** `!watchtime <?username>` - shows own or specified user watch time.

## Triggers:

Todo.

#### Greetings

Greetings are special triggers. When someone type for e.g. "hello!" bot will reply with random message. Triggers and messages are saved in database. You can change settings by hand or by commands, check [#Commands](#commands).

#### Goodbyes

Goodbyes are special triggers, like Greetings. When someone type for e.g. "good night" bot will reply. All settings for Goodbyes are in database and can by changed by hand or by commands - check [#Commands](#commands)

## Overlays

Todo.

#### How can say "thank you"?

Come to live stream, leave a star ⭐ on this repo or simply add some info about author! 

Remember, however, that it is not required. 😊