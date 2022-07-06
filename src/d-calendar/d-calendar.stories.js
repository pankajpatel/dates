import config from "../config";
import "./d-calendar";

export default {
  title: "Dates/Calendar",
};

const Template =
  (
    input = `<input type="text" class="datepicker" placeholder="DoB" />`,
    extra = ""
  ) =>
  (args) =>
    `
<label>Date of Birth</label>
<${config.calendarComponent} ${Object.keys(args).reduce(
      (acc, k) => `${acc} ${k}='${args[k]}'`,
      ""
    )}>

  </${config.calendarComponent}>
`;

export const Default = Template().bind({});
Default.args = {};

export const DurationStep = Template().bind({});
DurationStep.args = {
  "open-event": "focus",
  "close-event": "blur",
  months: 2,
  step: 1,
};

export const Custom = Template(
  '<input type="text" class="dob" placeholder="DoB" />'
).bind({});
Custom.args = {
  on: ".dob",
};

export const CustomDurationStep = Template(
  '<input type="text" class="dob" placeholder="DoB" />'
).bind({});
CustomDurationStep.args = {
  ...Custom.args,
  "open-event": "focus",
  "close-event": "blur",
  months: 2,
  step: 1,
};

export const Static = Template(
  "",
  `<script>
    document.querySelector('${config.calendarComponent}').addEventListener('change', (e) => {
      console.log(document.querySelector('${config.calendarComponent}').value);
    });
  </script>`
).bind({});
Static.args = {
  ...Custom.args,
  "open-event": "focus",
  "close-event": "blur",
  months: 2,
  step: 1,
};
