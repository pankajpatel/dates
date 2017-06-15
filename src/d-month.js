const moment = require('moment');
const monthWeeks = require('./utils/getCalendarMonthWeeks');
const template = require('./templates/month.t');

const monthFormat = 'MMMM YYYY';

const monthHtml = day => {
  const month = moment(day)
  const weeks = monthWeeks(month, true);
  const monthTitle = month.format(monthFormat);
  return template({moment, month, weeks, monthTitle});
}

(function(window, document, undefined) {
  var thatDoc = document;

  var Month = Object.create(HTMLElement.prototype);

  Month.createdCallback = function() {
    let date = this.getAttribute('for-month')
    this.innerHTML = monthHtml(date);
  };

  window.CalendarMonth = thatDoc.registerElement('d-month', {
    prototype: Month
  });
})(window, document);

