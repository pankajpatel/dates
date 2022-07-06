import config from "../config";
import("./d-day");

export default {
  title: "Dates/Day",
};

const Template = (args) => `
<span class="d-calendar-day">
  <${config.dayComponent} ${Object.keys(args).reduce(
  (acc, k) => `${acc} ${k}='${args[k]}'`,
  ""
)}></${config.dayComponent}>
</span>
`;

export const Default = Template.bind({});
Default.args = {};

export const Pivoted = Template.bind({});
Pivoted.args = {
  date: "2018-01-01",
};

export const Selected = Template.bind({});
Selected.args = {
  selected: true,
};

export const Highlighted = Template.bind({});
Highlighted.args = {
  highlighted: true,
};
