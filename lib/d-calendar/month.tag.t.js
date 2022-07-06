"use strict";

var config = require("../config");

module.exports = function (month) {
  return "<".concat(config.monthComponent, " for-month=\"").concat(month.format("YYYY-MM-DD"), "\"></").concat(config.monthComponent, ">");
};