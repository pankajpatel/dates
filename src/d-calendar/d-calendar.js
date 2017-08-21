require('document-register-element');
const moment = require('moment');
const config = require('../config');
const monthWeeks = require('../utils/getWeeks');
const getMonths = require('../utils/getMonths');
const template = require('./calendar.t');
const monthTagTemplate = require('./month.tag.t');
const { $find, $append, $prepend } = require('../utils/dom');

require('./d-calendar.scss');
require('../d-month/d-month');

export const MODES = {
  input: 'input',
  static: 'static',
};
export const DEFAULT_MODE = MODES.input;

moment.locale('en');

class Calendar extends HTMLElement {
  constructor(){
    super()
  }
  connectedCallback() {
    this.moment = moment;
    let value = null;
    this.input = this.getAttribute('on') || '.datepicker';
    this.openEvent = this.getAttribute('open-event') || 'focus';
    this.closeEvent = this.getAttribute('close-event') || 'blur';

    // Mode of Calendar
    this.mode = this.getAttribute('mode') || DEFAULT_MODE;

    // Is the calendar used as range?
    this.range = this.hasAttribute('range');

    // Number of Months which should be visible
    this.monthCount = parseInt(this.getAttribute('months') || 1);
    this.monthCount = isNaN(this.monthCount) ? 1 : this.monthCount;

    // Steps to cycle through while navigating the months, defaults to 1
    this.step = parseInt(this.getAttribute('step') || 1);

    // Step can not tbe greater than the visible months count
    this.step = this.step > this.monthCount ? this.monthCount : this.step;

    // Set default month element's width
    this.monthWidth = 0;

    // Flag for the Navigation of months
    this.navFlag = 0;

    let conf = getMonths(this.monthCount, value);

    this.months = conf.months;
    this.monthsMap = conf.map;
    this.render();

    this.bindings();
  }

  render() {
    this.innerHTML = template({
      monthTagTemplate,
      mode: this.mode,
      modes: MODES,
      months: this.months,
    });
    this._component = this;
    // this._popup = this._component.querySelector('.d-calendar-popup');
    this._popup = this;
  }

  slideLeft() {
    this._component.querySelector('.d-calendar').style.marginLeft = `-${this.monthWidth * this.navFlag}px`;
  }

  slideRight() {
    let cal = this._component.querySelector('.d-calendar');
    cal.classList.remove('animate');
    cal.style.marginLeft = `-${this.monthWidth * (this.navFlag)}px`;
    cal.classList.add('animate');
  }

  /**
   * Move the calendar ahead
   */
  moveNext() {
    for (var index = 0; index < this.step; index++) {
      this.navFlag++;
      if(!this.months[this.navFlag+this.step]){
        let month = this.months[this.months.length - 1].add(1, 'month');
        if(!this.monthsMap[month.format('YYYYMM')]) {
          this.months.push(month);
          this.monthsMap[month.format('YYYYMM')] = month;
          $append(monthTagTemplate(month), this.querySelector('.d-calendar-row'));
        }
      }
      this.slideLeft();
    }
  }

  /**
   * Move the calendar behind
   */
  movePrevious() {
    for (var index = 0; index < this.step; index++) {
      if(this.navFlag == 0){
        let month = this.months[0].subtract(1, 'month');
        if(!this.monthsMap[month.format('YYYYMM')]) {
          this.months.unshift(month);
          this.monthsMap[month.format('YYYYMM')] = month;
          $prepend(monthTagTemplate(month), this.querySelector('.d-calendar-row'));
        }
      } else {
        this.navFlag--;
        this.slideRight();
      }
    }
  }

  getWidth() {
    return this.querySelector(config.monthComponent).getBoundingClientRect().width;
  }

  updateWidth(width) {
    this.monthWidth = width || this.getWidth();
    this._component.style.width = (this.monthWidth * this.monthCount) + 'px';
    // this._popup.style;
  }

  bindings() {
    this.addEventListener('click', (e) => {
      if(e.target.classList.contains('d-calendar-day-button')){
        this.value = e.target.value;
        // Unselect the selected date
        this.querySelector('.selected').classList.remove('selected');
        e.target.classList.add('selected');
        // this.close(e, true);
        if(this.mode === MODES.input){
          $find(this.input, this).forEach(el => {
            el.value = this.value;
          });
        }
        const event = new Event('change');
        event.data = {
          value: this.value
        }
        this.dispatchEvent(event);
      }
    });

    this.querySelector('.d-calender-navigation-previous').addEventListener('click', (e) => {
      this.movePrevious();
    });
    this.querySelector('.d-calender-navigation-next').addEventListener('click', (e) => {
      this.moveNext();
    });

    this.updateWidth();
  }
}

customElements.define(config.calendarComponent, Calendar);
