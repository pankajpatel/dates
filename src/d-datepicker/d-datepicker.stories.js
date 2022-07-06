import config from "../config";
import "./d-datepicker";

export default {
  title: "Dates/DatePicker",
};

const Template = (args) => `
<${config.datePickerComponent} ${Object.keys(args).reduce(
  (acc, k) => `${acc} ${k}='${args[k]}'`,
  ""
)}>
  <input type="text" class="datepicker" placeholder="Select Dates" />
</${config.datePickerComponent}>
`;

export const Default = Template.bind({});
Default.args = {
  "open-event": "focus",
  "close-event": "blur",
  months: 2,
  step: 1,
};

export const Pivoted = Template.bind({});
Pivoted.args = {
  "for-datepicker": "2018-01-01",
};
