const Discord = require('discord.js'); // npm install discord.js

class JDClient {
    discord = null;
    token = '';
    trigger = '.';

    onConnect = null;
    onMessage = null;

	constructor() {
        this.discord = new Discord.Client();

        this.discord.on('ready', ()=>{
            // console.log(`Logged in as ${discord.user.tag}!`);
            if (this.onConnect != null) this.onConnect();
        });
          
        this.discord.on('message', args => {
            if (args.content.indexOf(this.trigger) == 0) {
                var arr = args.content.slice(this.trigger.length).split(' ');
                var cmd = arr[0];
                arr.shift();
                var pars = this.Parse(arr.join(' '));
          
                if (this.Commands.hasOwnProperty(cmd)) {
                    this.Commands[cmd].run(args, pars, arr);
                } else {
                    // command not found
                }
            } else {
                if (this.onMessage != null) this.onMessage(args);
            }
        });
    }

    Connect() {
        if (this.token.length > 0) this.discord.login(this.token);
    }

    Parse(text, chr = '"') {
        var words = text.split(' ');
        var flag = false;
        var output = [];
        var word = [];
        for (let i = 0; i < words.length; i++) {
            if (!flag && words[i].indexOf(chr) == 0 && words[i].lastIndexOf(chr) == words[i].length - 1) {
                output.push(words[i].substr(1, words[i].length - 2));
            } else if (!flag && words[i].indexOf(chr) == 0) {
                flag = true;
                word.push(words[i].substr(1));
            } else if (flag) {
                if (words[i].indexOf(chr) == words[i].length - 1) {
                    flag = false;
                    word.push(words[i].substr(0, words[i].length - 1));
                    if (word.length > 0) output.push(word.join(' '));
                    word = [];
                } else {
                    word.push(words[i]);
                }
            } else {
                output.push(words[i]);
            }
        }
        return output;
    }

    Commands = {
        /*
            test: {
                run: (args, pars, arr)=>{
                    ...your action here
                }
            }
        */
    }
}

module.exports = {JDClient, Discord};