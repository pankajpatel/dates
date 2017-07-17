'use strict';

module.exports = function (data) {
    return '<button\n    type="button" ' + data.disabled + ' value="' + data.day.format('YYYY-MM-DD') + '"\n    class="d-calendar-day-button ' + (data.class || '') + ' ' + (data.highlighted ? 'd-day-highlighted' : '') + ' ' + (data.selected ? 'd-day-selected' : '') + '" data-date="' + data.day.format('YYYY-MM-DD') + '">\n    ' + data.day.format('D') + '\n  </button>';
};