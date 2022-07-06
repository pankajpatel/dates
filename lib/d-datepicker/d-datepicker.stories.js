"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Pivoted = exports.Default = void 0;

var _config = _interopRequireDefault(require("../config"));

require("./d-datepicker");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  title: "Dates/DatePicker"
};
exports["default"] = _default;

var Template = function Template(args) {
  return "\n<".concat(_config["default"].datePickerComponent, " ").concat(Object.keys(args).reduce(function (acc, k) {
    return "".concat(acc, " ").concat(k, "='").concat(args[k], "'");
  }, ""), ">\n  <input type=\"text\" class=\"datepicker\" placeholder=\"Select Dates\" />\n</").concat(_config["default"].datePickerComponent, ">\n");
};

var Default = Template.bind({});
exports.Default = Default;
Default.args = {
  "open-event": "focus",
  "close-event": "blur",
  months: 2,
  step: 1
};
var Pivoted = Template.bind({});
exports.Pivoted = Pivoted;
Pivoted.args = {
  "for-datepicker": "2018-01-01"
};