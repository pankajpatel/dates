const config = require('../src/config');
const {storiesOf} = require('ascesis-storybook');

const {withConsole} = require('../.storybook/console-plugin');

require('../src/d-calendar/d-calendar')

storiesOf('Calendar')
  .addDecorator(withConsole())
  .add('default', () => `
    <label>Date of Birth</label>
    <${config.calendarComponent}>
      <input type="text" class="datepicker" placeholder="DoB" />
    </${config.calendarComponent}>
  `)
  .add('Months: 2, Step: 1', () => `
    <label>Date of Birth</label>
    <${config.calendarComponent} on=".datepicker" open-event="focus" close-event="blur" months="2" step="1">
      <input type="text" class="datepicker" placeholder="DoB" />
    </${config.calendarComponent}><br/>
    <small>Shows 2 months and stps over one month</small>
  `)
  .add('Months: 2, Step: 2', () => `
    <label>Default</label>
    <${config.calendarComponent} on=".datepicker" open-event="focus" close-event="blur" months="2" step="2">
      <input type="text" class="datepicker" placeholder="DoB" />
    </${config.calendarComponent}><br/>
    <small>Shows 2 months and stps over two months</small>
  `)

storiesOf('Custom Calendar')
  .add('default', () => `
    <label>Date of Birth</label>
    <${config.calendarComponent} on=".dob">
      <input type="text" class="dob" placeholder="DoB" />
    </${config.calendarComponent}>
  `)
  .add('Months: 2, Step: 1', () => `
    <label>Date of Birth</label>
    <${config.calendarComponent} on=".dob" open-event="focus" close-event="blur" months="2" step="1">
      <input type="text" class="dob" placeholder="DoB" />
    </${config.calendarComponent}><br/>
    <small>Shows 2 months and stps over one month</small>
  `)
  .add('Months: 2, Step: 2', () => `
    <label>Default</label>
    <${config.calendarComponent} on=".dob" open-event="focus" close-event="blur" months="2" step="2">
      <input type="text" class="dob" placeholder="DoB" />
    </${config.calendarComponent}><br/>
    <small>Shows 2 months and stps over two months</small>
  `)
