require('document-register-element');
const moment = require('moment');
const config = require('../config');
const monthWeeks = require('../utils/getWeeks');
const template = require('./month.t');

require('../d-day/d-day');
require('./d-month.scss');

const monthTitleFormat = 'MMMM YYYY';

const monthHtml = day => {
  const month = moment(day)
  const weeks = monthWeeks(month, true);
  const monthTitle = month.format(monthTitleFormat);
  return template({moment, month, weeks, monthTitle});
}

class Month extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    let date = this.getAttribute('for-month') || moment();
    this.innerHTML = monthHtml(date);
  }
}

customElements.define(config.monthComponent, Month);
