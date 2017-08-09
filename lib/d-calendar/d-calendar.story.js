'use strict';

var _require = require('ascesis-storybook'),
    storiesOf = _require.storiesOf;

require('./d-calendar');

storiesOf('Calendar').add('default', function () {
  return '\n    <label>Date of Birth</label>\n    <d-calendar>\n      <input type="text" class="datepicker" placeholder="DoB" />\n    </d-calendar>\n  ';
}).add('Months: 2, Step: 1', function () {
  return '\n    <label>Date of Birth</label>\n    <d-calendar on=".datepicker" open-event="focus" close-event="blur" months="2" step="1">\n      <input type="text" class="datepicker" placeholder="DoB" />\n    </d-calendar><br/>\n    <small>Shows 2 months and stps over one month</small>\n  ';
}).add('Months: 2, Step: 2', function () {
  return '\n    <label>Default</label>\n    <d-calendar on=".datepicker" open-event="focus" close-event="blur" months="2" step="2">\n      <input type="text" class="datepicker" placeholder="DoB" />\n    </d-calendar><br/>\n    <small>Shows 2 months and stps over two months</small>\n  ';
});

storiesOf('Custom Calendar').add('default', function () {
  return '\n    <label>Date of Birth</label>\n    <d-calendar on=".dob">\n      <input type="text" class="dob" placeholder="DoB" />\n    </d-calendar>\n  ';
}).add('Months: 2, Step: 1', function () {
  return '\n    <label>Date of Birth</label>\n    <d-calendar on=".dob" open-event="focus" close-event="blur" months="2" step="1">\n      <input type="text" class="dob" placeholder="DoB" />\n    </d-calendar><br/>\n    <small>Shows 2 months and stps over one month</small>\n  ';
}).add('Months: 2, Step: 2', function () {
  return '\n    <label>Default</label>\n    <d-calendar on=".dob" open-event="focus" close-event="blur" months="2" step="2">\n      <input type="text" class="dob" placeholder="DoB" />\n    </d-calendar><br/>\n    <small>Shows 2 months and stps over two months</small>\n  ';
});
