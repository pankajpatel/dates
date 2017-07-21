const {storiesOf} = require('ascesis-storybook');

require('../src/d-month/d-month');

storiesOf('Month')
  .add('default', () => `
    <d-month></d-month>
  `)
  .add('pivoted', () => `
    <d-month for-month="2018-01-01"></d-month>
  `)
