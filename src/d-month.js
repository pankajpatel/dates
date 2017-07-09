const moment = require('moment');
const monthWeeks = require('./utils/getWeeks');
const template = require('./templates/month.t');

const monthFormat = 'MMMM YYYY';

const monthHtml = day => {
  const month = moment(day)
  const weeks = monthWeeks(month, true);
  const monthTitle = month.format(monthFormat);
  return template({moment, month, weeks, monthTitle});
}

(function(window, document, undefined) {

  var Month = Object.create(HTMLElement.prototype);

  Month.createdCallback = function(d) {
    let date = d || this.getAttribute('for-month')
    this.innerHTML = monthHtml(date);
  };

  window.CalendarMonth = document.registerElement('d-month', {
    prototype: Month
  });
})(window, document);

