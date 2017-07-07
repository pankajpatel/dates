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
    <d-calendar prop1="prop 1 value" prop3="option 1">
      <input type="text" class="datepicker"/>
    </d-calendar>
`);

module.exports = story;
