const moment = require('moment');
const template = require('./templates/day.t');

(function(window, document, undefined) {
  var thatDoc = document;

  var Day = Object.create(HTMLElement.prototype);

  Day.createdCallback = function() {
    this.outerHTML = template({
      day: moment(this.getAttribute('date')),
      disabled: this.getAttribute('disabled'),
    })
  };

  window.CalendarDay = thatDoc.registerElement('d-day', {
    prototype: Day
  });
})(window, document);
