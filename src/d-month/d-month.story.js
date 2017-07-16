const {storiesOf} = require('ascesis-storybook');

require('./d-month')

storiesOf('Month')
  .add('default', () => `
    <d-month></d-month>
  `)
  .add('pivoted', () => `
    <d-month for-month="2018-01-01"></d-month>
  `)
