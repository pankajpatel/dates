import config from "../config";
import "./d-rangepicker";

export default {
  title: "Dates/RangePicker",
};

const Template = (args) => `
<${config.rangePickerComponent} open-event="focus" close-event="blur" months="2" step="1">
    <input type="text" class="datepicker from" placeholder="Select Dates" />
    <input type="text" class="datepicker to" placeholder="Select Dates" />
  </${config.rangePickerComponent}><br/>
  <script>
  console.log('script loaded');
  document.querySelector('${config.rangePickerComponent}').addEventListener('range', (e) => {
    console.log(document.querySelector('${config.rangePickerComponent}').value);
  });
</script>
`;

export const Default = Template.bind({});
Default.args = {};

const PivotedTemplate = () => `
<${config.rangePickerComponent} for-rangepicker="2018-01-01"></${config.rangePickerComponent}>
`;

export const Pivoted = PivotedTemplate.bind({});
Pivoted.args = {
  "for-rangepicker": "2018-01-01",
};
