var Utility = require("./lib/Utility");
var Socket  = require("./lib/socket");

module.exports  = {
    getRequestParams : Utility.getRequestParams,
    configure :Socket.configure,
    emitGroupUpdates  :Socket.emitGroupUpdates
}
