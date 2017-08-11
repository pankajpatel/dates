require('document-register-element');
const moment = require('moment');
const config = require('../config');
const template = require('./day.t');

require('./d-day.scss');

class Day extends HTMLElement {
  constructor() {
    super();
  }

  conncetedCallback() {
    this.day = moment(this.getAttribute('date') || new Date);
    this.outerHTML = template({
      day: this.day,
      selected: Boolean(this.getAttribute('selected')),
      highlighted: Boolean(this.getAttribute('highlighted')),
      class: this.getAttribute('class') || '',
      disabled: this.getAttribute('disabled'),
    })
  }
}

customElements.define(config.dayComponent, Day);
