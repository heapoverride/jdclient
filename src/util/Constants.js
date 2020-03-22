/**
  * Default JDClient options
  * @typedef {Object} DefaultOptions
  * @property {string} token Discord api token
  * @property {string} [trigger='.'] The string required to invoke a command
  * @property {boolean} [autoconnect=true] Indicates if the client should automatically connect
  * @property {boolean} [debug=true] False will supress all debug messages
  * @property {number} [verbosity=true] Debug verbose level, setting to `2` will display more debug info
  */
module.exports.DefaultOptions = {
  token: '',
  trigger: '.',
  autoconnect: true,
  debug: true,
  verbosity: 1
}