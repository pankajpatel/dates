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
    this._component = this.querySelector('.js-component');
    this._popup = this._component.querySelector('.d-calendar-popup');

    this.input = this.getAttribute('on') || '.datepicker';
    this.openEvent = this.getAttribute('open-event') || 'focus';
    this.closeEvent = this.getAttribute('close-event') || 'blur';

    this.value = this.querySelector(this.input).value;

    this.bindings();
  }

  close(e, force) {
    setTimeout(() => {
      if(force || !this.querySelectorAll(':focus').length){
        this._component.classList.add('hidden');
        this.querySelector(this.input).classList.remove('d-focused')
      }
    }, 100);
  }

  bindings(){
    this.calendar.addEventListener('change', () => {
      // console.log('DatePicker', this.calendar.value);
    });

    $find(this.input, this).forEach(el => {
      el.addEventListener(this.openEvent, (e) => {
        this._component.classList.remove('hidden');
        this.querySelector(this.input).classList.add('d-focused')
          this.calendar.updateWidth();
      })
      // el.addEventListener(this.closeEvent, this.close)
    });
  }
}

customElements.define(config.datePickerComponent, DatePicker);
