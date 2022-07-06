"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("@ungap/custom-elements");

var _config = _interopRequireDefault(require("../config"));

var _rangepicker = _interopRequireDefault(require("./rangepicker.t"));

var _dom = require("../utils/dom");

var _dateSet = _interopRequireDefault(require("../utils/dateSet"));

var _dDatepicker = _interopRequireDefault(require("../d-datepicker/d-datepicker"));

require("./d-rangepicker.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var MODES = {
  individual: "individual",
  // shows and hides calender for
  continuous: "continuous",
  eventOnly: "event-only"
};

var RangePicker = /*#__PURE__*/function (_DatePicker) {
  _inherits(RangePicker, _DatePicker);

  var _super = _createSuper(RangePicker);

  function RangePicker() {
    _classCallCheck(this, RangePicker);

    return _super.apply(this, arguments);
  }

  _createClass(RangePicker, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.mode = this.getAttribute("mode") || MODES.eventOnly;

      _get(_getPrototypeOf(RangePicker.prototype), "connectedCallback", this).call(this);

      this.value = []; // if (this.hasAttribute('step')) {
      //   attrs.push({ name: 'step', value: this.getAttribute('step') });
      // }

      this.arrow = this.querySelector(".arrow");
    }
  }, {
    key: "removeFocus",
    value: function removeFocus() {
      // Hide calendar and remove focus ring
      this._component.classList.add("hidden");

      var focused = (0, _dom.$find)("".concat(this.input, ".d-focused"), this);

      if (focused.length > 0) {
        focused.forEach(function (el) {
          el.classList.remove("d-focused");
        });
      }
    }
  }, {
    key: "bindings",
    value: function bindings() {
      var _this = this;

      this.calendar.addEventListener("change", function (e) {
        e.preventDefault();
        e.stopPropagation(); // Populate the input with picked value

        _this.querySelector("".concat(_this.input, ".d-focused")).value = _this.calendar.value;

        if (_this.value.length >= 2) {
          _this.value = [];
        }

        _this.value.push(_this.calendar.value);

        _this.value = _this.value.sort(function (a, b) {
          return a - b;
        });

        _this.removeFocus();

        var event = new Event("range");
        event.data = {
          value: _this.value
        };

        if (_this.value.length === 2) {
          _this.selectDuration.apply(_this, _toConsumableArray(_this.value));
        }

        _this.dispatchEvent(event);
      });
      (0, _dom.$find)(this.input, this).forEach(function (el) {
        var timeout = null;
        el.addEventListener(_this.openEvent, function (e) {
          if (timeout) {
            clearTimeout(timeout);
          }

          _this.removeFocus();

          var input = e.target;
          input.classList.add("d-focused");

          _this._component.classList.remove("hidden");

          var position = input.getBoundingClientRect();
          _this.arrow.style.marginLeft = "".concat(position.left + 10, "px");

          _this.calendar.updateWidth();
        });
        el.addEventListener(_this.closeEvent, function (e) {
          timeout = setTimeout(function () {
            if (!_this.querySelectorAll("".concat(_this.input, ".d-focused")).length) {
              _this.close(e, true);
            }
          }, 100);
        });
      });
      (0, _dom.$find)("".concat(_config["default"].dayComponent, ":not([out-of-month])"), this).forEach(function (el) {
        el.addEventListener("mouseenter", function (e) {
          if (_this.value.length < 2) {
            _this.hoveredDate = e.target.value;

            _this.highlightDuration(_this.querySelector("".concat(_this.input, ".from")).value, _this.hoveredDate);
          }
        });
        el.addEventListener("mouseleave", function () {
          if (_this.hoveredDate) {
            _this.hoveredDate = null;

            _this.unhighlightDuration();
          }
        });
      });
    }
  }, {
    key: "selectDuration",
    value: function selectDuration(startDate, stopDate) {
      var _this2 = this;

      return (0, _dateSet["default"])(startDate, stopDate, function (date) {
        var dateEl = _this2.querySelector("".concat(_config["default"].dayComponent, "[date='").concat(date, "']:not([out-of-month])"));

        if (dateEl) {
          dateEl.markSelected();
        }
      });
    }
  }, {
    key: "highlightDuration",
    value: function highlightDuration(startDate, stopDate) {
      var _this3 = this;

      return (0, _dateSet["default"])(startDate, stopDate, function (date) {
        var dateEl = _this3.querySelector("".concat(_config["default"].dayComponent, "[date='").concat(date, "']:not([out-of-month])"));

        if (dateEl) {
          dateEl.markHighlighted();
        }
      });
    }
  }, {
    key: "unselectDuration",
    value: function unselectDuration() {
      (0, _dom.$find)("".concat(_config["default"].dayComponent, "[selected]"), this).forEach(function (date) {
        return date.unmarkSelected();
      });
    }
  }, {
    key: "unhighlightDuration",
    value: function unhighlightDuration() {
      (0, _dom.$find)("".concat(_config["default"].dayComponent, "[highlighted]"), this).forEach(function (date) {
        return date.unmarkHighlighted();
      });
    }
  }]);

  return RangePicker;
}(_dDatepicker["default"]);

customElements.define(_config["default"].rangePickerComponent, RangePicker);