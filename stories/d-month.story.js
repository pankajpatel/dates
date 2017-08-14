const config = require('../src/config');
const {storiesOf} = require('ascesis-storybook');

require('../src/d-month/d-month');

storiesOf('Month')
  .add('default', () => `
    <${config.monthComponent}></${config.monthComponent}>
  `)
  .add('pivoted', () => `
    <${config.monthComponent} for-month="2018-01-01"></${config.monthComponent}>
  `)
