import 'document-register-element';
import config from '../config';
import template from './rangepicker.t';
import { $find } from '../utils/dom';

import onEachDateInRange from '../utils/dateSet';
import '../d-calendar/d-calendar';
import DatePicker from '../d-datepicker/d-datepicker';

import './d-rangepicker.scss';

class RangePicker extends DatePicker {
  connectedCallback() {
    // if (this.hasAttribute('step')) {
    //   attrs.push({ name: 'step', value: this.getAttribute('step') });
    // }
    super.connectedCallback();
  }

  bindings() {
    this.calendar.addEventListener('change', () => {
      // Populate the input with picked value
      this.querySelector(`${this.input}.d-focused`).value = this.calendar.value;
      // Hide calendar and remove focus ring
      this._component.classList.add('hidden');
      this.querySelector(`${this.input}.d-focused`).classList.remove('d-focused');
    });

    $find(this.input, this).forEach((el) => {
      el.addEventListener(this.openEvent, (e) => {
        this._component.classList.remove('hidden');
        e.target.classList.add('d-focused');
        this.calendar.updateWidth();
      });
      // el.addEventListener(this.closeEvent, this.close)
    });

    $find(config.dayComponent, this).forEach((el) => {
      el.addEventListener('mouseenter', (e) => {
        this.hoveredDate = e.target.value;
        // console.log(`hover ${this.hoveredDate}`)
      });
      el.addEventListener('mouseleave', (e) => {
        this.hoveredDate = null;
      });
    });
  }

  selectDuration(startDate, stopDate) {
    return onEachDateInRange(startDate, stopDate, (date, index) => {
      const dateEl = this.querySelector(`${config.dayComponent}[date='${date}']:not([out-of-month])`);
      if (dateEl) {
        dateEl.markSelected();
      }
    });
  }

  highlightDuration(startDate, stopDate) {
    return onEachDateInRange(startDate, stopDate, (date, index) => {
      const dateEl = this.querySelector(`${config.dayComponent}[date='${date}']:not([out-of-month])`);
      if (dateEl) {
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
