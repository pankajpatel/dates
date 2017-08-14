require('document-register-element');
const moment = require('moment');
const config = require('../config');
const template = require('./rangepicker.t');
const { $find } = require('../utils/dom');
import onEachDateInRange from '../utils/dateSet';
require('../d-calendar/d-calendar');
require('./d-rangepicker.scss');

class RangePicker extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.moment = moment;
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
    $find(config.dayComponent, this).forEach(el => {
      el.addEventListener('mouseenter', e => {
        this.hoveredDate = e.target.value;
        console.log(`hover ${this.hoveredDate}`)
      })
      el.addEventListener('mouseleave', e => {
        this.hoveredDate = null;
      })
    });
    this.calendar.addEventListener('change', () => {
      console.log('Range', this.calendar.value);
    })
  }

  selectDuration(startDate, stopDate) {
    return onEachDateInRange(startDate, stopDate, (date, index) => {
      let dateEl = this.querySelector(`${config.dayComponent}[date='${date}']:not([out-of-month])`)
      if(dateEl) {
        dateEl.markSelected();
      }
    });
  }

  highlightDuration(startDate, stopDate) {
    return onEachDateInRange(startDate, stopDate, (date, index) => {
      let dateEl = this.querySelector(`${config.dayComponent}[date='${date}']:not([out-of-month])`)
      if(dateEl) {
        dateEl.markHighlighted();
      }
    });
  }
  unselectDuration() {
    $find(`${config.dayComponent}[selected]`, this).forEach(date => date.unmarkSelected());

  }
  unhighlightDuration() {
    $find(`${config.dayComponent}[highlighted]`, this).forEach(date => date.unmarkHighlighted());
  }
}

customElements.define(config.rangePickerComponent, RangePicker);
