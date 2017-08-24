import 'document-register-element';
import config from '../config';
import template from './datepicker.t';
import { $find } from '../utils/dom';
import '../d-calendar/d-calendar';
import './d-datepicker.scss';

class DatePicker extends HTMLElement {
  connectedCallback() {
    const contents = this.innerHTML;
    const attrs = [];
    if (this.hasAttribute('months')) {
      attrs.push({ name: 'months', value: this.getAttribute('months') });
    }
    if (this.hasAttribute('step')) {
      attrs.push({ name: 'step', value: this.getAttribute('step') });
    }

    this.innerHTML = template({ config, contents, attrs });
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
      if (force || !this.querySelectorAll(':focus').length) {
        this._component.classList.add('hidden');
        this.querySelector(this.input).classList.remove('d-focused');
      }
    }, 100);
  }

  bindings() {
    this.calendar.addEventListener('change', () => {
      // Populate the input with picked value
      this.querySelector(this.input).value = this.calendar.value;
    });

    $find(this.input, this).forEach((el) => {
      el.addEventListener(this.openEvent, (e) => {
        this._component.classList.remove('hidden');
        this.querySelector(this.input).classList.add('d-focused');
        this.calendar.updateWidth();
      });
      // el.addEventListener(this.closeEvent, this.close)
    });
  }
}

customElements.define(config.datePickerComponent, DatePicker);
export default DatePicker;
