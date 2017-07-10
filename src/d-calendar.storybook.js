const {Story, Props} = require('element-storybook');

let story = new Story('d-calendar');

story
  .addProp('on','string')
  .addProp('open-event','string')
  .addProp('close-event','string')
  .addProp('months',[1, 2, 3])
  .addProp('step',[1, 2, 3])
  .addProp('range','boolean');

story.add(`default`, `
    <d-calendar></d-calendar>
`)
.add(`with child`, `
    <d-calendar on=".datepicker" open-event="focus" close-event="blur" months="1" step="1">
      <input type="text" class="datepicker" placeholder="DoB" value="2017-08-12">
    </d-calendar>
`);

module.exports = story;
