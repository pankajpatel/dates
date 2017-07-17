'use strict';

var config = require('../config');
module.exports = function (month) {
  return '<' + config.monthComponent + ' for-month="' + month.format('YYYY-MM-DD') + '"></' + config.monthComponent + '>';
};