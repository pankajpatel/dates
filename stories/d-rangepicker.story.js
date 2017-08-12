const config = require('../src/config');
const {storiesOf} = require('ascesis-storybook');

require('../src/d-rangepicker/d-rangepicker');

storiesOf('Range Picker')
  .add('default', () => `
    <${config.rangePickerComponent}></${config.rangePickerComponent}>
  `)
  .add('pivoted', () => `
    <${config.rangePickerComponent} for-rangepicker="2018-01-01"></${config.rangePickerComponent}>
  `)
