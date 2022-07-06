"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("document-register-element");

var _moment = _interopRequireDefault(require("moment"));

var _config = _interopRequireDefault(require("../config"));

var _getMonths = _interopRequireDefault(require("../utils/getMonths"));

var _calendar = _interopRequireDefault(require("./calendar.t"));

var _monthTag = _interopRequireDefault(require("./month.tag.t"));

var _dom = require("../utils/dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

require("./d-calendar.css");

require("../d-month/d-month");

_moment["default"].locale("en");

var Calendar = /*#__PURE__*/function (_HTMLElement) {
  _inherits(Calendar, _HTMLElement);

  var _super = _createSuper(Calendar);

  function Calendar() {
    _classCallCheck(this, Calendar);

    return _super.apply(this, arguments);
  }

  _createClass(Calendar, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.moment = _moment["default"];
      this.value = null;
      this.input = this.getAttribute("on") || ".datepicker";
      this.openEvent = this.getAttribute("open-event") || "focus";
      this.closeEvent = this.getAttribute("close-event") || "blur"; // Is the calendar used as range?

      this.range = this.hasAttribute("range"); // Number of Months which should be visible

      this.monthCount = parseInt(this.getAttribute("months") || 1, 10);
      this.monthCount = isNaN(this.monthCount) ? 1 : this.monthCount; // Steps to cycle through while navigating the months, defaults to 1

      this.step = parseInt(this.getAttribute("step") || 1, 10); // Step can not tbe greater than the visible months count

      this.step = this.step > this.monthCount ? this.monthCount : this.step; // Set default month element's width

      this.monthWidth = 0; // Flag for the Navigation of months

      this.navFlag = 0;
      var conf = (0, _getMonths["default"])(this.monthCount, this.value);
      this.months = conf.months;
      this.monthsMap = conf.map;
      this.render();
      this.bindings();
    }
  }, {
    key: "render",
    value: function render() {
      this.innerHTML = (0, _calendar["default"])({
        monthTagTemplate: _monthTag["default"],
        mode: this.mode,
        months: this.months
      });
      this._component = this;
    }
  }, {
    key: "slideLeft",
    value: function slideLeft() {
      this._component.querySelector(".d-calendar").style.marginLeft = "-".concat(this.monthWidth * this.navFlag, "px");
    }
  }, {
    key: "slideRight",
    value: function slideRight() {
      var cal = this._component.querySelector(".d-calendar");

      cal.classList.remove("animate");
      cal.style.marginLeft = "-".concat(this.monthWidth * this.navFlag, "px");
      cal.classList.add("animate");
    }
    /**
     * Move the calendar ahead
     */

  }, {
    key: "moveNext",
    value: function moveNext() {
      for (var index = 0; index < this.step; index++) {
        this.navFlag++;

        if (!this.months[this.navFlag + this.step]) {
          var month = this.months[this.months.length - 1].add(1, "month");

          if (!this.monthsMap[month.format("YYYYMM")]) {
            this.months.push(month);
            this.monthsMap[month.format("YYYYMM")] = month;
            (0, _dom.$append)((0, _monthTag["default"])(month), this.querySelector(".d-calendar-row"));
          }
        }

        this.slideLeft();
      }
    }
    /**
     * Move the calendar behind
     */

  }, {
    key: "movePrevious",
    value: function movePrevious() {
      for (var index = 0; index < this.step; index++) {
        if (this.navFlag == 0) {
          var month = this.months[0].subtract(1, "month");

          if (!this.monthsMap[month.format("YYYYMM")]) {
            this.months.unshift(month);
            this.monthsMap[month.format("YYYYMM")] = month;
            (0, _dom.$prepend)((0, _monthTag["default"])(month), this.querySelector(".d-calendar-row"));
          }
        } else {
          this.navFlag--;
          this.slideRight();
        }
      }
    }
  }, {
    key: "getWidth",
    value: function getWidth() {
      return this.querySelector(_config["default"].monthComponent).getBoundingClientRect().width;
    }
  }, {
    key: "updateWidth",
    value: function updateWidth(width) {
      this.monthWidth = width || this.getWidth();
      this._component.style.width = "".concat(this.monthWidth * this.monthCount, "px");
    }
  }, {
    key: "bindings",
    value: function bindings() {
      var _this = this;

      this.addEventListener("click", function (e) {
        if (e.target.classList.contains("d-calendar-day-button")) {
          _this.value = e.target.value; // Unselect the selected date

          if (_this.querySelector(".selected")) {
            _this.querySelector(".selected").classList.remove("selected");
          }

          e.target.classList.add("selected");
          var event = new Event("change");
          event.data = {
            value: _this.value
          };

          _this.dispatchEvent(event);
        }
      });
      this.querySelector(".d-calender-navigation-previous").addEventListener("click", function () {
        _this.movePrevious();
      });
      this.querySelector(".d-calender-navigation-next").addEventListener("click", function () {
        _this.moveNext();
      });
      this.updateWidth();
    }
  }]);

  return Calendar;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

customElements.define(_config["default"].calendarComponent, Calendar);