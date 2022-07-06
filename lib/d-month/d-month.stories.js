"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Pivoted = exports.Default = void 0;

var _config = _interopRequireDefault(require("../config"));

require("./d-month");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  title: "Dates/Month"
};
exports["default"] = _default;

var Template = function Template(args) {
  return "\n<".concat(_config["default"].monthComponent, " ").concat(Object.keys(args).reduce(function (acc, k) {
    return "".concat(acc, " ").concat(k, "='").concat(args[k], "'");
  }, ""), "></").concat(_config["default"].monthComponent, ">\n");
};

var Default = Template.bind({});
exports.Default = Default;
Default.args = {};
var Pivoted = Template.bind({});
exports.Pivoted = Pivoted;
Pivoted.args = {
  "for-month": "2018-01-01"
};