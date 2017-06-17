const moment = require('moment');
const template = require('./templates/day.t');

(function(window, document, undefined) {

  var Day = Object.create(HTMLElement.prototype);

  Day.createdCallback = function() {
    this.outerHTML = template({
      class: this.getAttribute('class') || '',
      day: moment(this.getAttribute('date')),
      disabled: this.getAttribute('disabled'),
    })
  };

  window.CalendarDay = document.registerElement('d-day', {
    prototype: Day
  });
})(window, document);
