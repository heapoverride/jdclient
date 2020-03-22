/** 
  * Handles parsing and storing of user input
  * @author UnrealSecurity ( https://github.com/UnrealSecurity/ )
  * @author Marzavec ( https://github.com/marzavec/ )
  * @version v1.0.0
  * @license MIT
  */

class CommandLine {
  constructor(triggerLength, text) {
    /**
      * Store length of the trigger
      * @type {string}
      */
    this.triggerLength = triggerLength;

    /**
      * Store original command evocation
      * @type {string}
      */
    this.commandText = text;

    /**
      * Default command name
      * @type {string}
      */
    this.commandName = 'help';

    /**
      * Default parsed array
      * @type {string}
      */
    this.commandParsed = [];

    /**
      * Default unparsed array
      * @type {string}
      */
    this.commandArray = [];
    
    this.parse();
  }

  /**
    * Stores command name, original input as array and parsed command line array
    * @private
    */
  parse() {
    this.commandArray = this.commandText.substr(this.triggerLength).trim().split(' ');
    this.commandName = this.commandArray[0];
    this.commandArray.shift();

    let chr = '"';
    let words = this.commandArray;
    let flag = false;
    let word = [];
    for (let i = 0; i < words.length; i++) {
      if (!flag && words[i].indexOf(chr) == 0 && words[i].lastIndexOf(chr) == words[i].length - 1) {
        this.commandParsed.push(words[i].substr(1, words[i].length - 2));
      } else if (!flag && words[i].indexOf(chr) == 0) {
        flag = true;
        word.push(words[i].substr(1));
      } else if (flag) {
        if (words[i].indexOf(chr) == words[i].length - 1) {
          flag = false;
          word.push(words[i].substr(0, words[i].length - 1));
          if (word.length > 0) this.commandParsed.push(word.join(' '));
          word = [];
        } else {
          word.push(words[i]);
        }
      } else {
        this.commandParsed.push(words[i]);
      }
    }
  }

  /**
    * String deconstructor override, returning the command name
    * @public
    */
  toString() {
    return this.commandName;
  }

  /**
    * Return the preparsed command array
    * @type {array}
    * @readonly
    */
  get parsed() {
    return this.commandParsed;
  }
  
  /**
    * Return the unparsed command array
    * @type {array}
    * @readonly
    */
  get array() {
    return this.commandArray;
  }
}

module.exports = {
  CommandLine
};
