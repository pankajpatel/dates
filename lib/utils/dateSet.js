"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var moment = require("moment");

var _default = function _default(startDate, stopDate, callbackForEach) {
  var dateArray = [];
  var input = [moment(startDate), moment(stopDate)].sort(function (a, b) {
    return a - b;
  });
  var currentDate = input[0];
  var endDate = input[1];

  while (currentDate <= endDate) {
    var newDate = moment(currentDate).format("YYYY-MM-DD");
    dateArray.push(newDate);
    callbackForEach(newDate, dateArray.length);
    currentDate = moment(currentDate).add(1, "days");
  }

  return dateArray;
};

exports["default"] = _default;