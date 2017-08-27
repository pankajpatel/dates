import 'document-register-element';
import config from '../config';
import template from './rangepicker.t';
import { $find } from '../utils/dom';

import onEachDateInRange from '../utils/dateSet';
import DatePicker from '../d-datepicker/d-datepicker';
import './d-rangepicker.scss';

class RangePicker extends DatePicker {
  connectedCallback() {
    this.mode = this.getAttribute('mode') || 'individual';

    super.connectedCallback();
    this.value = [];
    // if (this.hasAttribute('step')) {
    //   attrs.push({ name: 'step', value: this.getAttribute('step') });
    // }
    this.arrow = this.querySelector('.arrow');
  }


  removeFocus() {
    // Hide calendar and remove focus ring
    this._component.classList.add('hidden');
    const focused = $find(`${this.input}.d-focused`, this)
    if(focused.length > 0) {
      focused.forEach(el => {
        el.classList.remove('d-focused');
      });
    }
  }

  bindings() {
    this.calendar.addEventListener('change', (e) => {
      e.preventDefault();
      e.stopPropagation();
      // Populate the input with picked value
      this.querySelector(`${this.input}.d-focused`).value = this.calendar.value;
      if (this.value.length >= 2) {
        this.value = [];
      }
      this.value.push(this.calendar.value);
      this.value = this.value.sort((a, b) => a - b);
      this.removeFocus();
      const event = new Event('range');
      event.data = {
        value: this.value,
      };
      this.dispatchEvent(event);
    });

    $find(this.input, this).forEach((el) => {
      el.addEventListener(this.openEvent, (e) => {
        this.removeFocus()
        const input = e.target;
        input.classList.add('d-focused');
        this._component.classList.remove('hidden');
        let position = input.getBoundingClientRect()
        this.arrow.style.marginLeft = `${position.left + 10}px`;
        this.calendar.updateWidth();
      });
      // el.addEventListener(this.closeEvent, this.close)
    });

    $find(`${config.dayComponent}:not([out-of-month])`, this).forEach((el) => {
      el.addEventListener('mouseenter', (e) => {
        this.hoveredDate = e.target.value;
        this.highlightDuration(this.querySelector(`${this.input}.from`).value, this.hoveredDate );
      });
      el.addEventListener('mouseleave', (e) => {
        this.hoveredDate = null;
        this.unhighlightDuration();
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
