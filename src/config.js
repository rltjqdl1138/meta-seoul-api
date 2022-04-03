const CONFIG = {};
CONFIG.app = process.env.NODE_ENV || 'local';
CONFIG.app_name = 'MetaSeoul';
CONFIG.scheme = process.env.SCHEME || 'http';
CONFIG.host = process.env.HOST || 'localhost';
CONFIG.port = process.env.PORT || '8100';
module.exports = CONFIG;