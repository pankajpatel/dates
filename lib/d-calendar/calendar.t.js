'use strict';

module.exports = function (data) {
  return '<div class="js-component hidden">\n  <div class="arrow"></div>\n  <div class="d-calendar animate">\n    <button type="button" class="d-calender-navigation-previous">&lArr;</button>\n    <button type="button" class="d-calender-navigation-next">&lArr;</button>\n    <div class="d-calendar-row">\n      ' + data.months.map(function (month) {
    return data.monthTagTemplate(month);
  }).join('') + '\n    </div>\n  </div>\n</div>';
};