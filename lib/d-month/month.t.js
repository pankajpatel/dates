'use strict';

var config = require('../config');
module.exports = function (data) {
  return '<div class="d-calendar-month">\n  <table>\n    <caption>\n      <strong>' + data.monthTitle + '</strong>\n      <ul>\n        <li><small>' + data.moment().weekday(7).format('dd') + '</small></li>\n        <li><small>' + data.moment().weekday(1).format('dd') + '</small></li>\n        <li><small>' + data.moment().weekday(2).format('dd') + '</small></li>\n        <li><small>' + data.moment().weekday(3).format('dd') + '</small></li>\n        <li><small>' + data.moment().weekday(4).format('dd') + '</small></li>\n        <li><small>' + data.moment().weekday(5).format('dd') + '</small></li>\n        <li><small>' + data.moment().weekday(6).format('dd') + '</small></li>\n      </ul>\n    </caption>\n    <tbody>\n      ' + data.weeks.map(function (week) {
    return '<tr>\n        ' + week.map(function (day) {
      var disabled = day && data.month && day.month() !== data.month.month() ? 'disabled' : '';
      var selected = day.date() == 15 ? 'selected' : '';
      var highlighted = day.date() == 18 ? 'highlighted' : '';
      return '<td class="d-calendar-day ' + disabled + ' ' + selected + ' ' + highlighted + '"><' + config.dayComponent + '\n            disabled="' + disabled + '" ' + selected + ' ' + highlighted + '\n            date="' + day.format('YYYY-MM-DD') + '">' + day.format('D') + '</' + config.dayComponent + '></td>';
    }).join('') + '\n        </tr>';
  }).join('') + '\n    </tbody>\n  </table>\n</div>';
};