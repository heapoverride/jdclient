![jdclient-logo](https://i.ibb.co/h13RjW8/jdclientjs.png)

## Description
JDClient is a simple wrapper built on top of [Discord.js](https://discord.js.org/) that can automatically do the command parsing for you.

## Events
- **ready** `{ client, text, data }`
- **message** `{ jdclient, content, message }`
- **debug** `{ client, text, data }`
- **error** `{ client, text, data }`

## Minimal example
```javascript
// import library
const { JDClient, Discord } = require('./src/');

/**
  * define minimum bot options
  * view `./src/util/Constants.js` for all possible options
  * view `./app.js` for event bindings
  */
const options = {
  token: 'your discord bot token here',
  trigger: '.'
};

// build bot commands
const commands = {
  help: {
    run: (message, pars, arr)=>{
      message.reply('**Available commands:** \n' + Object.keys(bot.commands).join(', '))
    }
  }
};

// create bot instance
var bot = new JDClient(options, commands);
```
You might also need to access the underlying Discord.js client and it's name is "discord" inside JDClient so for the example above it would be ``bot.discord``.
