"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Pivoted = exports.Default = void 0;

var _config = _interopRequireDefault(require("../config"));

require("./d-rangepicker");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  title: "Dates/RangePicker"
};
exports["default"] = _default;

var Template = function Template(args) {
  return "\n<".concat(_config["default"].rangePickerComponent, " open-event=\"focus\" close-event=\"blur\" months=\"2\" step=\"1\">\n    <input type=\"text\" class=\"datepicker from\" placeholder=\"Select Dates\" />\n    <input type=\"text\" class=\"datepicker to\" placeholder=\"Select Dates\" />\n  </").concat(_config["default"].rangePickerComponent, "><br/>\n  <script>\n  console.log('script loaded');\n  document.querySelector('").concat(_config["default"].rangePickerComponent, "').addEventListener('range', (e) => {\n    console.log(document.querySelector('").concat(_config["default"].rangePickerComponent, "').value);\n  });\n</script>\n");
};

var Default = Template.bind({});
exports.Default = Default;
Default.args = {};

var PivotedTemplate = function PivotedTemplate() {
  return "\n<".concat(_config["default"].rangePickerComponent, " for-rangepicker=\"2018-01-01\"></").concat(_config["default"].rangePickerComponent, ">\n");
};

var Pivoted = PivotedTemplate.bind({});
exports.Pivoted = Pivoted;
Pivoted.args = {
  "for-rangepicker": "2018-01-01"
};