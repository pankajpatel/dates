import config from "../config";
import "./d-month";

export default {
  title: "Dates/Month",
};

const Template = (args) => `
<${config.monthComponent} ${Object.keys(args).reduce(
  (acc, k) => `${acc} ${k}='${args[k]}'`,
  ""
)}></${config.monthComponent}>
`;

export const Default = Template.bind({});
Default.args = {};

export const Pivoted = Template.bind({});
Pivoted.args = {
  "for-month": "2018-01-01",
};
