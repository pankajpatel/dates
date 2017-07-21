const {storiesOf} = require('ascesis-storybook');

require('../src/d-day/d-day');

storiesOf('Day')
  .add('default', () => `
    <span class="d-calendar-day">
      <d-day></d-day>
    </span>
  `)
  .add('pivoted', () => `
    <span class="d-calendar-day">
      <d-day date="2018-01-01"></d-day>
    </span>
  `)
  .add('disabled', () => `
    <span class="d-calendar-day">
      <d-day disabled></d-day>
    </span>
  `)
  .add('selected', () => `
    <span class="d-calendar-day">
      <d-day selected></d-day>
    </span>
  `)
  .add('highlighted', () => `
    <span class="d-calendar-day">
      <d-day highlighted></d-day>
    </span>
  `)
