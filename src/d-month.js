const moment = require('moment');
const monthWeeks = require('./utils/getCalendarMonthWeeks');
const monthFormat = 'MMMM YYYY';

const weekHeader = () => {
  const header = [];
  for (let i = 0; i < 7; i += 1) {
    header.push(`<li><small>${moment().weekday(i).format('dd')}</small></li>`);
  }
  return (`<ul>${header.join('')}</ul>`);
}

const getDay = (day, month) => {
  let disabled = (day && month && day.month() !== month.month()) ? 'disabled' : '';
  return day
    ? `<td class="d-calendar-day ${disabled}">
        <button type="button" ${disabled} class="d-calendar-day" data-date="${day.format('YYYY-MM-DD')}">${day.format('D')}</button>
      </td>`
    : `<td></td>`;
}

const monthHtml = day => {
  let month = moment(day)
  let weeks = monthWeeks(month, true);
  const monthTitle = month.format(monthFormat);
  var weekHtml = weeks.map((week, i) => {
      return `<tr>
        ${week.map((day, j) => {
          return `${getDay(day, month)}`;
        }).join('')}
      </tr>`
    }).join('')

  var html = `
  <div class="d-calendar-month">
    <table>
      <caption>
        <strong>${monthTitle}</strong>
        ${weekHeader()}
      </caption>
      <tbody>${weekHtml}</tbody>
    </table>
  </div>`
  return html
}

(function(window, document, undefined) {
  var thatDoc = document;

  var thisDoc =  (thatDoc._currentScript || thatDoc.currentScript).ownerDocument;
  var Month = Object.create(HTMLElement.prototype);

  Month.createdCallback = function() {
    let date = this.getAttribute('for-month')
    this.innerHTML = monthHtml(date);
  };

  window.CalendarMonth = thatDoc.registerElement('d-month', {
    prototype: Month
  });
})(window, document);

