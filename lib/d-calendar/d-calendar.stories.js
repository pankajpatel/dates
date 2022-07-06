"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Static = exports.DurationStep = exports.Default = exports.CustomDurationStep = exports.Custom = void 0;

var _config = _interopRequireDefault(require("../config"));

require("./d-calendar");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = {
  title: "Dates/Calendar"
};
exports["default"] = _default;

var Template = function Template() {
  var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "<input type=\"text\" class=\"datepicker\" placeholder=\"DoB\" />";
  var extra = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  return function (args) {
    return "\n<label>Date of Birth</label>\n<".concat(_config["default"].calendarComponent, " ").concat(Object.keys(args).reduce(function (acc, k) {
      return "".concat(acc, " ").concat(k, "='").concat(args[k], "'");
    }, ""), ">\n\n  </").concat(_config["default"].calendarComponent, ">\n");
  };
};

var Default = Template().bind({});
exports.Default = Default;
Default.args = {};
var DurationStep = Template().bind({});
exports.DurationStep = DurationStep;
DurationStep.args = {
  "open-event": "focus",
  "close-event": "blur",
  months: 2,
  step: 1
};
var Custom = Template('<input type="text" class="dob" placeholder="DoB" />').bind({});
exports.Custom = Custom;
Custom.args = {
  on: ".dob"
};
var CustomDurationStep = Template('<input type="text" class="dob" placeholder="DoB" />').bind({});
exports.CustomDurationStep = CustomDurationStep;
CustomDurationStep.args = _objectSpread(_objectSpread({}, Custom.args), {}, {
  "open-event": "focus",
  "close-event": "blur",
  months: 2,
  step: 1
});
var Static = Template("", "<script>\n    document.querySelector('".concat(_config["default"].calendarComponent, "').addEventListener('change', (e) => {\n      console.log(document.querySelector('").concat(_config["default"].calendarComponent, "').value);\n    });\n  </script>")).bind({});
exports.Static = Static;
Static.args = _objectSpread(_objectSpread({}, Custom.args), {}, {
  "open-event": "focus",
  "close-event": "blur",
  months: 2,
  step: 1
});