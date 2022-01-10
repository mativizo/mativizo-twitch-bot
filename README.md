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

## Roles and custom roles

As a default bot has 6 roles:
- Streamer (Broadcaster) *from Twitch*
- Supermoderator *custom*
- Moderator *from Twitch*
- Subscriber *from Twitch*
- Vip *from Twitch*
- Regular *custom*

You can add your custom roles and assign to users - check [#Commands](#Commands).

## Commands

| Command | Category | Usage | Default Permissions | Description |
| ------- | -------- | ----- | ------------------- | ----------- |
|`greetings add trigger <trigger phrase>` | Greetings | `!greetings add trigger good morning` | Streamer | Adds trigger phrase for greetings. |
|`greetings add response <response phrase>` | Greetings | `!greetings add response Welcome 👋` | Streamer | Adds response phrase for greetings. |
|`greetings list triggers` | Greetings | `!greetings list triggers` | Streamer | Shows list of all greetings triggers with ids. |
|`greetings list responses` | Greetings | `!greetings list responses` | Streamer | Shows list of all greetings responses with ids. |
|`greetings remove trigger <id>` | Greetings | `!greetings remove trigger 13` | Streamer | Removes specified trigger by id. |
|`greetings remove response <id>` | Greetings | `!greetings remove response 13` | Streamer | Removes specified response by id. |
|`goodbyes add trigger <trigger phrase>` | Goodbyes | `!goodbyes add trigger goodbye` | Streamer | Adds trigger phrase for goodbyes. |
|`goodbyes add response <response phrase>` | Goodbyes | `!goodbyes add response See ya! 👋` | Streamer | Adds response phrase for goodbyes. |
|`goodbyes list triggers` | Goodbyes | `!goodbyes list triggers` | Streamer | Shows list of all goodbyes triggers with ids. |
|`goodbyes list responses` | Goodbyes | `!goodbyes list responses` | Streamer | Shows list of all goodbyes responses with ids. |
|`goodbyes remove trigger <id>` | Goodbyes | `!goodbyes remove trigger 13` | Streamer | Removes specified trigger by id. |
|`goodbyes remove response <id>` | Goodbyes | `!goodbyes remove response 13` | Streamer | Removes specified response by id. |
|`reload` | Dev | `!reload` | Streamer | Reloads command files. |
|`id <?user>` | Dev | `!id`,  `!id @mativizo`, `!id mativizo` | Streamer | Shows user ID. |
|`prefix <newPrefix>` | Configuration | `!prefix >` | Streamer | Changes prefix. |
|`help <commandName>` | Other | `!help lurk` | All | Shows info about command. |
|`lurk` | Other | `!lurk` | All | Informs streamer about going to lurk. |
|`cmds` | Other | `!cmds` | All | Shows all available commands. |
|`role create <Role Name>` | Roles | `!role create Kappas Kappa` | Streamer | Creates custom role. |
|`role remove <roledid>` | Roles | `!role remove kappas-kappa` | Streamer | Removes custom role by id. |
|`role grant <roleid> <username>` | Roles | `!role grant kappas-kappa mativizo` | Streamer | Assigns specified user to specified role. |
|`role takeaway <roleid> <username>` | Roles | `!role takeaway kappas-kappa mativizo` | Streamer | Takes away specified role from specified user. |
|`role list <?roleid>` | Roles | `!role list`, `!role list kappas-kappa` | Streamer | Shows list of roles, or list of users if role ID specified. |

## WIP Commands:

### Super Moderators

- **WIP** `!stream game <game name>` - set streaming category.
- **WIP** `!stream title <stream title>` - set stream title.
- **WIP** `!stream ad` - activate ad.
- **WIP** `!stream marker <text>` - add marker with comment.
- **WIP** `!stream clip <durationinseconds>` - create clip (duration default 30).




### Moderators





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