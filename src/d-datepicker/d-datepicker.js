require('document-register-element');
const config = require('../config');
const template = require('./datepicker.t');
const { $find } = require('../utils/dom');
require('../d-calendar/d-calendar');
require('./d-datepicker.scss');

class DatePicker extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const contents = this.innerHTML;
    let attrs = [];
    this.hasAttribute('on') ? attrs.push[{name: 'on', value: this.getAttribute('on')}] : null;
    this.hasAttribute('open-event') ? attrs.push[{name: 'open-event', value: this.getAttribute('open-event')}] : null;
    this.hasAttribute('close-event') ? attrs.push[{name: 'close-event', value: this.getAttribute('close-event')}] : null;
    this.hasAttribute('months') ? attrs.push[{name: 'months', value: this.getAttribute('months')}] : null;
    this.hasAttribute('step') ? attrs.push[{name: 'step', value: this.getAttribute('step')}] : null;

    this.innerHTML = template({config, contents, attrs});
    this.calendar = this.querySelector(config.calendarComponent);
    this.bindings();
  }

  bindings(){
    this.calendar.addEventListener('change', () => {
      console.log('DatePicker', this.calendar.value);
    })
  }
}

customElements.define(config.datePickerComponent, DatePicker);
