/** 
  * JDClient is a simple wrapper built on top of Discord.js that can
  * automatically do the command parsing for you.
  * @author UnrealSecurity ( https://github.com/UnrealSecurity/ )
  * @author Marzavec ( https://github.com/marzavec/ )
  * @version v1.0.0
  * @license MIT
  * @extends EventEmitter
  */

const EventEmitter = require('events');
const Discord = require('discord.js');

const Util = Discord.Util;

const { DefaultOptions } = require('./util/Constants');
const { CommandLine } = require('./structures/CommandLine');

/**
  * Main command / client interface
  */
class JDClient extends EventEmitter {
  constructor(options, commands = {}) {
    super();

    /**
      * The options the client was instantiated with
      * @type {DefaultOptions}
      */
    this.options = Util.mergeDefault(DefaultOptions, options);

    /**
      * Stored string length of the bot trigger
      * @type {number}
      */
    this.triggerLength = this.options.trigger.length;

    /**
      * Command function container
      * @type {object}
      */
    this.commands = commands;

    /**
      * The main Discord interface & bindings
      * @type {Discord<Client>}
      * @private
      */
    this.discord = new Discord.Client();
    this.discord.on('ready', (e) => this.discordReady(e));
    this.discord.on('message', (e) => this.discordMessage(e));
    this.discord.on('error', (e) => this.pushError(e));

    if (this.options.verbosity >= 2) {
      this.discord.on('warn', (e) => this.pushDebug(e));
      this.discord.on('debug', (e) => this.pushDebug(e));
    }

    if (this.options.autoconnect) {
      setTimeout(() => this.connect(), 250);
    }
  }

  /**
    * Discord `ready` event handler
    * @private
    */
  discordReady() {
    /**
      * Emitted when Discord has connected
      * @event JDClient#ready
      * @type {object}
      * @property {boolean} client This JDClient reference
      */
    this.emit('ready', {
      client: this
    });
  }

  /**
    * Discord `message` event handler
    * @private
    */
  discordMessage(msg) {
    if (msg.author.id === this.discord.user.id) {
      // ignore messages sent by this bot
      return;
    }

    let { content } = msg;

    /**
      * Emitted when a new message has been received
      * @event JDClient#message
      * @type {object}
      * @property {JDClient} client This JDClient reference
      * @property {object} msg Original discord message object
      */
    this.emit('message', {
      client: this,
      text: content,
      data: msg
    });

    if (content.startsWith(this.options.trigger)) {
      let cmd = new CommandLine(this.triggerLength, content);
      
      if (this.commands.hasOwnProperty(cmd)) {
        this.commands[cmd].run(msg, cmd.parsed, cmd.array);
      } else {
        this.pushDebug(`Unknown user command: ${cmd}`, cmd);
      }
    }
  }

  /**
    * Attempts to connect to Discord
    * @public
    */
  connect() {
    this.pushDebug('JDClient attempting to connect. . .');
    
    if (this.triggerLength === 0) {
      this.pushError('Missing Discord token');
    }

    try {
      this.discord.login(this.options.token);
    } catch (err) {
      this.pushError(`Discord login error: ${err}`, err);
    }
  }

  /**
    * Emits debug data to any listeners
    * @param {string} text Hard coded reason for debug emission
    * @param {*} data Variant debug data to pass
    * @private
    */
  pushDebug(text, data = {}) {
    if (this.options.debug === false) {
      return;
    }

    /**
      * Emitted when JDClient has debug data
      * @event JDClient#debug
      * @type {object}
      * @property {JDClient} client This JDClient reference
      * @property {string} text Reason for debug emission
      * @property {*} data Variant debug data
      */
    this.emit('debug', {
      client: this,
      text,
      data
    });
  }

  /**
    * Emits debug data to any listeners
    * @param {string} text Hard coded reason for debug emission
    * @param {*} data Variant debug data to pass
    * @private
    */
   pushError(text, data = {}) {
    /**
      * Emitted when JDClient encounters an error
      * @event JDClient#error
      * @type {object}
      * @property {JDClient} client This JDClient reference
      * @property {string} text Reason for debug emission
      * @property {*} data Variant debug data
      */
    this.emit('error', {
      client: this,
      text,
      data
    });
  }
}
 
module.exports = {
  JDClient,
  Discord
};
