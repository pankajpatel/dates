const config = require('../src/config');
const {storiesOf} = require('modulor-storybook');

require('../src/d-day/d-day');

storiesOf('Day')
  .add('default', () => `
    <span class="d-calendar-day">
      <${config.dayComponent}></${config.dayComponent}>
    </span>
  `)
  .add('pivoted', () => `
    <span class="d-calendar-day">
      <${config.dayComponent} date="2018-01-01"></${config.dayComponent}>
    </span>
  `)
  .add('disabled', () => `
    <span class="d-calendar-day">
      <${config.dayComponent} disabled></${config.dayComponent}>
    </span>
  `)
  .add('selected', () => `
    <span class="d-calendar-day">
      <${config.dayComponent} selected></${config.dayComponent}>
    </span>
  `)
  .add('highlighted', () => `
    <span class="d-calendar-day">
      <${config.dayComponent} highlighted></${config.dayComponent}>
    </span>
  `)
