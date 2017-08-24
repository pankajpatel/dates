import 'document-register-element';
import moment from 'moment';
import config from '../config';
import monthWeeks from '../utils/getWeeks';
import getMonths from '../utils/getMonths';
import template from './calendar.t';
import monthTagTemplate from './month.tag.t';
import { $find, $append, $prepend } from '../utils/dom';

require('./d-calendar.scss');
require('../d-month/d-month');

moment.locale('en');

class Calendar extends HTMLElement {
  connectedCallback() {
    this.moment = moment;
    this.value = null;
    this.input = this.getAttribute('on') || '.datepicker';
    this.openEvent = this.getAttribute('open-event') || 'focus';
    this.closeEvent = this.getAttribute('close-event') || 'blur';

    // Is the calendar used as range?
    this.range = this.hasAttribute('range');

    // Number of Months which should be visible
    this.monthCount = parseInt(this.getAttribute('months') || 1, 10);
    this.monthCount = isNaN(this.monthCount) ? 1 : this.monthCount;

    // Steps to cycle through while navigating the months, defaults to 1
    this.step = parseInt(this.getAttribute('step') || 1, 10);

    // Step can not tbe greater than the visible months count
    this.step = this.step > this.monthCount ? this.monthCount : this.step;

    // Set default month element's width
    this.monthWidth = 0;

    // Flag for the Navigation of months
    this.navFlag = 0;

    const conf = getMonths(this.monthCount, this.value);

    this.months = conf.months;
    this.monthsMap = conf.map;
    this.render();

    this.bindings();
  }

  render() {
    this.innerHTML = template({
      monthTagTemplate,
      mode: this.mode,
      months: this.months,
    });
    this._component = this;
  }

  slideLeft() {
    this._component.querySelector('.d-calendar').style.marginLeft = `-${this.monthWidth * this.navFlag}px`;
  }

  slideRight() {
    const cal = this._component.querySelector('.d-calendar');
    cal.classList.remove('animate');
    cal.style.marginLeft = `-${this.monthWidth * (this.navFlag)}px`;
    cal.classList.add('animate');
  }

  /**
   * Move the calendar ahead
   */
  moveNext() {
    for (let index = 0; index < this.step; index++) {
      this.navFlag++;
      if (!this.months[this.navFlag + this.step]) {
        const month = this.months[this.months.length - 1].add(1, 'month');
        if (!this.monthsMap[month.format('YYYYMM')]) {
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
    for (let index = 0; index < this.step; index++) {
      if (this.navFlag == 0) {
        const month = this.months[0].subtract(1, 'month');
        if (!this.monthsMap[month.format('YYYYMM')]) {
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
    this._component.style.width = `${this.monthWidth * this.monthCount}px`;
  }

  bindings() {
    this.addEventListener('click', (e) => {
      if (e.target.classList.contains('d-calendar-day-button')) {
        this.value = e.target.value;
        // Unselect the selected date
        this.querySelector('.selected').classList.remove('selected');
        e.target.classList.add('selected');
        const event = new Event('change');
        event.data = {
          value: this.value,
        };
        this.dispatchEvent(event);
      }
    });

    this.querySelector('.d-calender-navigation-previous').addEventListener('click', () => {
      this.movePrevious();
    });
    this.querySelector('.d-calender-navigation-next').addEventListener('click', () => {
      this.moveNext();
    });

    this.updateWidth();
  }
}

customElements.define(config.calendarComponent, Calendar);
