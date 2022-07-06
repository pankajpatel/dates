"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Selected = exports.Pivoted = exports.Highlighted = exports.Default = void 0;

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

Promise.resolve().then(function () {
  return _interopRequireWildcard(require("./d-day"));
});
var _default = {
  title: "Dates/Day"
};
exports["default"] = _default;

var Template = function Template(args) {
  return "\n<span class=\"d-calendar-day\">\n  <".concat(_config["default"].dayComponent, " ").concat(Object.keys(args).reduce(function (acc, k) {
    return "".concat(acc, " ").concat(k, "='").concat(args[k], "'");
  }, ""), "></").concat(_config["default"].dayComponent, ">\n</span>\n");
};

var Default = Template.bind({});
exports.Default = Default;
Default.args = {};
var Pivoted = Template.bind({});
exports.Pivoted = Pivoted;
Pivoted.args = {
  date: "2018-01-01"
};
var Selected = Template.bind({});
exports.Selected = Selected;
Selected.args = {
  selected: true
};
var Highlighted = Template.bind({});
exports.Highlighted = Highlighted;
Highlighted.args = {
  highlighted: true
};