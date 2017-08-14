'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('document-register-element');
var moment = require('moment');
var config = require('../config');
var template = require('./day.t');

require('./d-day.scss');

var Day = function (_HTMLElement) {
  _inherits(Day, _HTMLElement);

  function Day() {
    _classCallCheck(this, Day);

    return _possibleConstructorReturn(this, (Day.__proto__ || Object.getPrototypeOf(Day)).call(this));
  }

  _createClass(Day, [{
    key: 'conncetedCallback',
    value: function conncetedCallback() {
      this.day = moment(this.getAttribute('date') || new Date());
      this.outerHTML = template({
        day: this.day,
        selected: Boolean(this.getAttribute('selected')),
        highlighted: Boolean(this.getAttribute('highlighted')),
        class: this.getAttribute('class') || '',
        disabled: this.getAttribute('disabled')
      });
    }
  }]);

  return Day;
}(HTMLElement);

customElements.define(config.dayComponent, Day);