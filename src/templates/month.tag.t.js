const config = require('../config');
module.exports = month => `<${config.monthComponent} for-month="${month.format('YYYY-MM-DD')}"></${config.monthComponent}>`;
