"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SELECTED_CLASS = exports.HIGHLIGHTED_CLASS = void 0;

require("@ungap/custom-elements");

var _moment = _interopRequireDefault(require("moment"));

var _config = _interopRequireDefault(require("../config"));

var _day = _interopRequireDefault(require("./day.t"));

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

require("./d-day.css");

var SELECTED_CLASS = "d-day-selected";
exports.SELECTED_CLASS = SELECTED_CLASS;
var HIGHLIGHTED_CLASS = "d-day-highlighted";
exports.HIGHLIGHTED_CLASS = HIGHLIGHTED_CLASS;

var Day = /*#__PURE__*/function (_HTMLElement) {
  _inherits(Day, _HTMLElement);

  var _super = _createSuper(Day);

  function Day() {
    _classCallCheck(this, Day);

    return _super.apply(this, arguments);
  }

  _createClass(Day, [{
    key: "attributeChangedCallback",
    value: function attributeChangedCallback(attr, oldValue, newValue) {
      if (oldValue !== newValue) {// console.log(this.value);
      }
    }
  }, {
    key: "connectedCallback",
    value: function connectedCallback() {
      this.day = (0, _moment["default"])(this.getAttribute("date") || new Date());
      this.value = this.getAttribute("date");
      this.innerHTML = (0, _day["default"])({
        day: this.day,
        selected: this.hasAttribute("selected"),
        highlighted: this.hasAttribute("highlighted"),
        "class": this.getAttribute("class") || "",
        disabled: this.hasAttribute("disabled")
      });
      this.removeAttribute("selected");
      this.removeAttribute("highlighted");
      this.button = this.querySelector("button");
    }
  }, {
    key: "markSelected",
    value: function markSelected() {
      this.setAttribute("selected", true);
      this.button.classList.add(SELECTED_CLASS);
    }
  }, {
    key: "markHighlighted",
    value: function markHighlighted() {
      this.setAttribute("highlighted", true);
      this.button.classList.add(HIGHLIGHTED_CLASS);
    }
  }, {
    key: "unmarkSelected",
    value: function unmarkSelected() {
      this.removeAttribute("selected");
      this.button.classList.remove(SELECTED_CLASS);
    }
  }, {
    key: "unmarkHighlighted",
    value: function unmarkHighlighted() {
      this.removeAttribute("highlighted");
      this.button.classList.remove(HIGHLIGHTED_CLASS);
    }
  }], [{
    key: "observedAttributes",
    get: function get() {
      return ["highlighted", "selected", "disabled"];
    }
  }]);

  return Day;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

customElements.define(_config["default"].dayComponent, Day);