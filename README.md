[jdclient-logo](https://i.ibb.co/h13RjW8/jdclientjs.png)

## Description
JDClient is a simple wrapper built on top of Discord.js that can automatically do the command parsing for you.

## Example
```javascript
const {JDClient, Discord} = require('./jdclient.js');

var bot = new JDClient();
bot.trigger = '.';
bot.token = 'your discord bot token here';

bot.onConnect = ()=>{
    console.log('We are logged into Discord!');
}

bot.onMessage = (message)=>{
    // need to handle messages that are not identified as commands?
}

bot.Commands = {
    help: {
        run: (message, pars, arr)=>{
            message.reply('**Available commands:** \n' + Object.keys(bot.Commands).join(', '))
        }
    }
}

bot.Connect();
```
You might also need to access the underlying Discord.js client and it's name is "discord" inside JDClient so for the example above it would be ``bot.discord``.
