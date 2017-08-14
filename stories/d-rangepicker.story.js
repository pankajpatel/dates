const config = require('../src/config');
const {storiesOf} = require('ascesis-storybook');

require('../src/d-rangepicker/d-rangepicker');

storiesOf('Range Picker')
  .add('default', () => `
  <${config.rangePickerComponent} open-event="focus" close-event="blur" months="2" step="1">
    <input type="text" class="datepicker from" placeholder="Select Dates" />
    <input type="text" class="datepicker to" placeholder="Select Dates" />
  </${config.rangePickerComponent}><br/>
  `)
  .add('pivoted', () => `
    <${config.rangePickerComponent} for-rangepicker="2018-01-01"></${config.rangePickerComponent}>
  `)
