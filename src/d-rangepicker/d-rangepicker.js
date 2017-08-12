require('document-register-element');
const moment = require('moment');
const config = require('../config');
const template = require('./rangepicker.t');

require('./d-rangepicker.scss');

class RangePicker extends HTMLElement {
  constructor() {
    super();
  }

  conncetedCallback() {
    this.innerHTML = template({config})
  }
}

customElements.define(config.rangePickerComponent, RangePicker);
