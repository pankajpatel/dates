'use strict';

var moment = require('moment');
var config = require('../config');
var monthWeeks = require('../utils/getWeeks');
var template = require('./month.t');

require('../d-day/d-day');
require('./d-month.scss');

var monthFormat = 'MMMM YYYY';

var monthHtml = function monthHtml(day) {
  var month = moment(day);
  var weeks = monthWeeks(month, true);
  var monthTitle = month.format(monthFormat);
  return template({ moment: moment, month: month, weeks: weeks, monthTitle: monthTitle });
};

(function (window, document, undefined) {

  var Month = Object.create(HTMLElement.prototype);

  Month.createdCallback = function () {
    var date = this.getAttribute('for-month') || moment();
    this.innerHTML = monthHtml(date);
  };

  window.CalendarMonth = document.registerElement(config.monthComponent, {
    prototype: Month
  });
})(window, document);