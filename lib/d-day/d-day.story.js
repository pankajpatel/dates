'use strict';

var _require = require('ascesis-storybook'),
    storiesOf = _require.storiesOf;

require('./d-day');

storiesOf('Day').add('default', function () {
  return '\n    <span class="d-calendar-day">\n      <d-day></d-day>\n    </span>\n  ';
}).add('pivoted', function () {
  return '\n    <span class="d-calendar-day">\n      <d-day date="2018-01-01"></d-day>\n    </span>\n  ';
}).add('disabled', function () {
  return '\n    <span class="d-calendar-day">\n      <d-day disabled></d-day>\n    </span>\n  ';
}).add('selected', function () {
  return '\n    <span class="d-calendar-day">\n      <d-day selected></d-day>\n    </span>\n  ';
}).add('highlighted', function () {
  return '\n    <span class="d-calendar-day">\n      <d-day highlighted></d-day>\n    </span>\n  ';
});
