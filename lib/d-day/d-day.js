'use strict';

var moment = require('moment');
var config = require('../config');
var template = require('./day.t');

require('./d-day.scss');

(function (window, document, undefined) {

  var Day = Object.create(HTMLElement.prototype);

  Day.createdCallback = function () {
    this.day = moment(this.getAttribute('date') || new Date());
    this.outerHTML = template({
      day: this.day,
      selected: Boolean(this.getAttribute('selected')),
      highlighted: Boolean(this.getAttribute('highlighted')),
      class: this.getAttribute('class') || '',
      disabled: this.getAttribute('disabled')
    });
  };

  window.CalendarDay = document.registerElement(config.dayComponent, {
    prototype: Day
  });
})(window, document);