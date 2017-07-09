const moment = require('moment');
const template = require('./templates/day.t');

(function(window, document, undefined) {

  var Day = Object.create(HTMLElement.prototype);

  Day.createdCallback = function() {
    this.day = moment(this.getAttribute('date'));
    this.outerHTML = template({
      day: this.day,
      selected: Boolean(this.getAttribute('selected')),
      highlighted: Boolean(this.getAttribute('highlighted')),
      class: this.getAttribute('class') || '',
      disabled: this.getAttribute('disabled'),
    })
  };

  window.CalendarDay = document.registerElement('d-day', {
    prototype: Day
  });
})(window, document);
