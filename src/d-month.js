const moment = require('moment');
const config = require('./config');
const monthWeeks = require('./utils/getWeeks');
const template = require('./templates/month.t');

require('./d-day');
require('./scss/d-month.scss');

const monthFormat = 'MMMM YYYY';

const monthHtml = day => {
  const month = moment(day)
  const weeks = monthWeeks(month, true);
  const monthTitle = month.format(monthFormat);
  return template({moment, month, weeks, monthTitle});
}

(function(window, document, undefined) {

  var Month = Object.create(HTMLElement.prototype);

  Month.createdCallback = function() {
    let date = this.getAttribute('for-month') || moment();
    this.innerHTML = monthHtml(date);
  };

  window.CalendarMonth = document.registerElement(config.monthComponent, {
    prototype: Month
  });
})(window, document);

