const config = require('../src/config');
const {storiesOf} = require('modulor-storybook');

require('../src/d-datepicker/d-datepicker');

storiesOf('Date Picker')
  .add('default', () => `
  <${config.datePickerComponent} open-event="focus" close-event="blur" months="2" step="1">
    <input type="text" class="datepicker" placeholder="Select Dates" />
  </${config.datePickerComponent}><br/>
  `)
  .add('pivoted', () => `
    <${config.datePickerComponent} for-datepicker="2018-01-01"></${config.datePickerComponent}>
  `)
