'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('document-register-element');
var moment = require('moment');
var config = require('../config');
var monthWeeks = require('../utils/getWeeks');
var template = require('./month.t');

require('../d-day/d-day');
require('./d-month.scss');

var monthTitleFormat = 'MMMM YYYY';

var monthHtml = function monthHtml(day) {
  var month = moment(day);
  var weeks = monthWeeks(month, true);
  var monthTitle = month.format(monthTitleFormat);
  return template({ moment: moment, month: month, weeks: weeks, monthTitle: monthTitle });
};

var Month = function (_HTMLElement) {
  _inherits(Month, _HTMLElement);

  function Month() {
    _classCallCheck(this, Month);

    return _possibleConstructorReturn(this, (Month.__proto__ || Object.getPrototypeOf(Month)).call(this));
  }

  _createClass(Month, [{
    key: 'connectedCallback',
    value: function connectedCallback() {
      var date = this.getAttribute('for-month') || moment();
      this.innerHTML = monthHtml(date);
    }
  }]);

  return Month;
}(HTMLElement);

customElements.define(config.monthComponent, Month);