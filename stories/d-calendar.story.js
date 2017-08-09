const {storiesOf} = require('ascesis-storybook');

const {withConsole} = require('../.storybook/console-plugin');

require('../src/d-calendar/d-calendar')

storiesOf('Calendar')
  .add('default', withConsole(() => `
    <label>Date of Birth</label>
    <d-calendar>
      <input type="text" class="datepicker" placeholder="DoB" />
    </d-calendar>
  `))
  .add('Months: 2, Step: 1', () => `
    <label>Date of Birth</label>
    <d-calendar on=".datepicker" open-event="focus" close-event="blur" months="2" step="1">
      <input type="text" class="datepicker" placeholder="DoB" />
    </d-calendar><br/>
    <small>Shows 2 months and stps over one month</small>
  `)
  .add('Months: 2, Step: 2', () => `
    <label>Default</label>
    <d-calendar on=".datepicker" open-event="focus" close-event="blur" months="2" step="2">
      <input type="text" class="datepicker" placeholder="DoB" />
    </d-calendar><br/>
    <small>Shows 2 months and stps over two months</small>
  `)

storiesOf('Custom Calendar')
  .add('default', () => `
    <label>Date of Birth</label>
    <d-calendar on=".dob">
      <input type="text" class="dob" placeholder="DoB" />
    </d-calendar>
  `)
  .add('Months: 2, Step: 1', () => `
    <label>Date of Birth</label>
    <d-calendar on=".dob" open-event="focus" close-event="blur" months="2" step="1">
      <input type="text" class="dob" placeholder="DoB" />
    </d-calendar><br/>
    <small>Shows 2 months and stps over one month</small>
  `)
  .add('Months: 2, Step: 2', () => `
    <label>Default</label>
    <d-calendar on=".dob" open-event="focus" close-event="blur" months="2" step="2">
      <input type="text" class="dob" placeholder="DoB" />
    </d-calendar><br/>
    <small>Shows 2 months and stps over two months</small>
  `)
