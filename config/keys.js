// Figure out what set of credentials to return
if(process.env.NODE_ENV === "production"){
    // We are in production - return production set of keys here
    module.exports = require('./prod')
} else {
    // we are in development - return dev set of keys
    module.exports = require('./dev')
}