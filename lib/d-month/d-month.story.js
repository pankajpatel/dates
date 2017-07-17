'use strict';

var _require = require('ascesis-storybook'),
    storiesOf = _require.storiesOf;

require('./d-month');

storiesOf('Month').add('default', function () {
  return '\n    <d-month></d-month>\n  ';
}).add('pivoted', function () {
  return '\n    <d-month for-month="2018-01-01"></d-month>\n  ';
});