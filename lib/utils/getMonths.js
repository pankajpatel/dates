'use strict';

var moment = require('moment');
module.exports = function (count, pivot) {
  var months = [];
  var monthMap = {};
  for (var i = 0; i < count; i++) {
    var date = moment(pivot || new Date());
    var direction = Boolean(i % 2);
    var num = parseInt((i + 1) / 2);
    if (i > 0) {
      date = date[direction ? 'add' : 'subtract'](num, 'month');
    }
    months.push(date);
    monthMap[date.format('YYYYMM')] = date;
  }
  months.sort(function (a, b) {
    return parseInt(a.format('YYYYMM')) - parseInt(b.format('YYYYMM'));
  });
  return { months: months, map: monthMap };
};