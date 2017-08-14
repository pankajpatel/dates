require('document-register-element');
const moment = require('moment');
const config = require('../config');
const template = require('./day.t');

require('./d-day.scss');

export const SELECTED_CLASS = 'd-day-selected';
export const HIGHLIGHTED_CLASS = 'd-day-highlighted';

class Day extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ['highlighted', 'selected', 'disabled'];
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    console.log(oldValue, newValue)
    if (oldValue === newValue) {
      return;
    }
  }

  connectedCallback() {
    this.day = moment(this.getAttribute('date') || new Date);
    this.value = this.getAttribute('date');
    this.innerHTML = template({
      day: this.day,
      selected: this.hasAttribute('selected'),
      highlighted: this.hasAttribute('highlighted'),
      class: this.getAttribute('class') || '',
      disabled: this.hasAttribute('disabled'),
    });
    this.removeAttribute('selected');
    this.removeAttribute('highlighted');
    this.button = this.querySelector('button');
  }

  markSelected() {
    this.setAttribute('selected', true);
    this.button.classList.add(SELECTED_CLASS);
  }

  markHighlighted() {
    this.setAttribute('highlighted', true);
    this.button.classList.add(HIGHLIGHTED_CLASS);
  }

  unmarkSelected() {
    this.removeAttribute('selected');
    this.button.classList.remove(SELECTED_CLASS);
  }

  unmarkHighlighted() {
    this.removeAttribute('highlighted');
    this.button.classList.remove(HIGHLIGHTED_CLASS);
  }
}

customElements.define(config.dayComponent, Day);
