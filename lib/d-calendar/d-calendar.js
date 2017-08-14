'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('document-register-element');
var moment = require('moment');
var config = require('../config');
var monthWeeks = require('../utils/getWeeks');
var getMonths = require('../utils/getMonths');
var template = require('./calendar.t');
var monthTagTemplate = require('./month.tag.t');

var _require = require('../utils/dom'),
    $find = _require.$find,
    $append = _require.$append,
    $prepend = _require.$prepend;

require('./d-calendar.scss');
require('../d-month/d-month');

moment.locale('en');

var Calendar = function (_HTMLElement) {
  _inherits(Calendar, _HTMLElement);

  function Calendar() {
    _classCallCheck(this, Calendar);

    return _possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call(this));
  }

  _createClass(Calendar, [{
    key: 'connectedCallback',
    value: function connectedCallback() {
      var _this2 = this;

      var value = null;
      this.input = this.getAttribute('on') || '.datepicker';
      this.openEvent = this.getAttribute('open-event') || 'focus';
      this.closeEvent = this.getAttribute('close-event') || 'blur';

      // Is the calendar used as range?
      this.range = this.hasAttribute('range');

      // Number of Months which should be visible
      this.monthCount = parseInt(this.getAttribute('months') || 1);
      this.monthCount = isNaN(this.monthCount) ? 1 : this.monthCount;

      // Steps to cycle through while navigating the months, defaults to 1
      this.step = parseInt(this.getAttribute('step') || 1);

      // Step can not tbe greater than the visible months count
      this.step = this.step > this.monthCount ? this.monthCount : this.step;

      // Set default month element's width
      this.monthWidth = 0;

      // Flag for the Navigation of months
      this.navFlag = 0;

      if (this.range) {
        value = {
          from: this.querySelector('.from').value,
          to: this.querySelector('.to').value
        };
      } else {
        value = this.querySelector(this.input).value;
      }

      var conf = getMonths(this.monthCount, value);

      this.months = conf.months;
      this.monthsMap = conf.map;
      // this.activeMonths = [moment(new Date).format['YYYYMM']];
      this.render();

      this.close = function (e, force) {
        setTimeout(function () {
          if (force || !_this2.querySelectorAll(':focus').length) {
            _this2._component.classList.add('hidden');
            _this2.querySelector(_this2.input).classList.remove('d-focused');
          }
        }, 100);
      };

      this.slideLeft = function () {
        _this2._component.querySelector('.d-calendar').style.marginLeft = '-' + _this2.monthWidth * _this2.navFlag + 'px';
      };
      this.slideRight = function () {
        var cal = _this2._component.querySelector('.d-calendar');
        cal.classList.remove('animate');
        cal.style.marginLeft = '-' + _this2.monthWidth * _this2.navFlag + 'px';
        cal.classList.add('animate');
      };

      /**
       * Move the calendar ahead
       */
      this.moveNext = function () {
        for (var index = 0; index < _this2.step; index++) {
          _this2.navFlag++;
          if (!_this2.months[_this2.navFlag]) {
            var month = _this2.months[_this2.months.length - 1].add(1, 'month');
            if (!_this2.monthsMap[month.format('YYYYMM')]) {
              _this2.months.push(month);
              _this2.monthsMap[month.format('YYYYMM')] = month;
              $append(monthTagTemplate(month), _this2.querySelector('.d-calendar-row'));
            }
          }
          _this2.slideLeft();
        }
      };

      /**
       * Move the calendar behind
       */
      this.movePrevious = function () {
        for (var index = 0; index < _this2.step; index++) {
          console.log(_this2.navFlag);
          if (_this2.navFlag == 0) {
            var month = _this2.months[0].subtract(1, 'month');
            if (!_this2.monthsMap[month.format('YYYYMM')]) {
              _this2.months.unshift(month);
              _this2.monthsMap[month.format('YYYYMM')] = month;
              $prepend(monthTagTemplate(month), _this2.querySelector('.d-calendar-row'));
            }
          } else {
            _this2.navFlag--;
            _this2.slideRight();
          }
        }
      };

      this.bindings();
    }
  }, {
    key: 'render',
    value: function render() {
      this.innerHTML += template({ months: this.months, monthTagTemplate: monthTagTemplate });
      this._component = this.querySelector('.js-component');
    }
  }, {
    key: 'bindings',
    value: function bindings() {
      var _this3 = this;

      this.getWidth = function () {
        return _this3.querySelector(config.monthComponent).getBoundingClientRect().width;
      };

      this.updateWidth = function (width) {
        _this3.monthWidth = width || _this3.getWidth();
        _this3._component.style.width = _this3.monthWidth * _this3.monthCount + 'px';
      };

      $find(this.input, this).forEach(function (el) {
        el.addEventListener(_this3.openEvent, function (e) {
          _this3._component.classList.remove('hidden');
          _this3.querySelector(_this3.input).classList.add('d-focused');
          if (!_this3.monthWidth) {
            _this3.updateWidth();
          }
        });
        el.addEventListener(_this3.closeEvent, _this3.close);
      });
      this.addEventListener('click', function (e) {
        if (e.target.classList.contains('d-calendar-day-button')) {
          _this3.value = e.target.value;
          console.log(_this3.value);
          e.target.classList.add('selected');
          // this.close(e, true);
          $find(_this3.input, _this3).forEach(function (el) {
            el.value = _this3.value;
          });
        }
      });

      this.querySelector('.d-calender-navigation-previous').addEventListener('click', function (e) {
        _this3.movePrevious();
      });
      this.querySelector('.d-calender-navigation-next').addEventListener('click', function (e) {
        _this3.moveNext();
      });
      $find('.d-calendar-day-button', this).forEach(function (el) {
        el.addEventListener('mouseenter', function (e) {

          _this3.hoveredDate = e.target.value;
        });
      });
    }
  }]);

  return Calendar;
}(HTMLElement);

customElements.define(config.calendarComponent, Calendar);