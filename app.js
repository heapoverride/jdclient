// import library
const { JDClient } = require('./src/');

// define minimum bot options
// view `./src/util/Constants.js` for all possible options
const options = {
  token: 'NDhxOaA4hjkaNzY1Mok5uDgT.XhaooQ.uG0gcMhsKtWrLPhouVoDboyRltM',
  trigger: '.'
};
// console.log( [...options.token].filter((_, i) => (i + 1) % 3 === 0).join('') );

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

// bind bot events, all of these are optional
bot.on('ready', () => {
  console.log('We are logged into Discord!');
});

bot.on('message', (event) => {
  let { client, text, data } = event;
  console.log(text);
});

bot.on('error', (event) => {
  const { client, text, data } = event;
  console.log(text);
});

bot.on('debug', (event) => {
  const { client, text, data } = event;
  console.log(text);
});
