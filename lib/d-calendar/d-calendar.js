'use strict';

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

(function (window, document, undefined) {
  moment.locale('en');
  // moment.locale('de');
  console.log('Story');
  var Calendar = Object.create(HTMLElement.prototype);

  Calendar.createdCallback = function () {
    var _this = this;

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
    this.innerHTML += template({ months: this.months, monthTagTemplate: monthTagTemplate });

    this._component = this.querySelector('.js-component');
    this.getWidth = function () {
      return _this.querySelector(config.monthComponent).getBoundingClientRect().width;
    };
    this.close = function (e, force) {
      setTimeout(function () {
        if (force || !_this.querySelectorAll(':focus').length) {
          _this._component.classList.add('hidden');
          _this.querySelector(_this.input).classList.remove('d-focused');
        }
      }, 100);
    };

    this.updateWidth = function (width) {
      _this.monthWidth = width || _this.getWidth();
      _this._component.style.width = _this.monthWidth * _this.monthCount + 'px';
    };
    this.slideLeft = function () {
      _this._component.querySelector('.d-calendar').style.marginLeft = '-' + _this.monthWidth * _this.navFlag + 'px';
    };
    this.slideRight = function () {
      var cal = _this._component.querySelector('.d-calendar');
      cal.classList.remove('animate');
      cal.style.marginLeft = '-' + _this.monthWidth * _this.navFlag + 'px';
      cal.classList.add('animate');
    };
    this.moveNext = function (step) {
      for (var index = 0; index < _this.step; index++) {
        _this.navFlag++;
        if (!_this.months[_this.navFlag]) {
          var month = _this.months[_this.months.length - 1].add(1, 'month');
          if (!_this.monthsMap[month.format('YYYYMM')]) {
            _this.months.push(month);
            _this.monthsMap[month.format('YYYYMM')] = month;
            $append(monthTagTemplate(month), _this.querySelector('.d-calendar-row'));
          }
        }
        _this.slideLeft();
      }
    };

    /**
     *
     */
    this.movePrevious = function () {
      for (var index = 0; index < _this.step; index++) {
        console.log(_this.navFlag);
        if (_this.navFlag == 0) {
          var month = _this.months[0].subtract(1, 'month');
          if (!_this.monthsMap[month.format('YYYYMM')]) {
            _this.months.unshift(month);
            _this.monthsMap[month.format('YYYYMM')] = month;
            $prepend(monthTagTemplate(month), _this.querySelector('.d-calendar-row'));
          }
        } else {
          _this.navFlag--;
          _this.slideRight();
        }
      }
    };

    $find(this.input, this).forEach(function (el) {
      el.addEventListener(_this.openEvent, function (e) {
        _this._component.classList.remove('hidden');
        _this.querySelector(_this.input).classList.add('d-focused');
        if (!_this.monthWidth) {
          _this.updateWidth();
        }
      });
      el.addEventListener(_this.closeEvent, _this.close);
    });
    this.addEventListener('click', function (e) {
      if (e.target.classList.contains('d-calendar-day-button')) {
        _this.value = e.target.value;
        console.log(_this.value);
        e.target.classList.add('selected');
        // this.close(e, true);
        $find(_this.input, _this).forEach(function (el) {
          el.value = _this.value;
        });
      }
    });

    this.querySelector('.d-calender-navigation-previous').addEventListener('click', function (e) {
      _this.movePrevious();
    });
    this.querySelector('.d-calender-navigation-next').addEventListener('click', function (e) {
      _this.moveNext();
    });
    $find('.d-calendar-day-button', this).forEach(function (el) {
      el.addEventListener('mouseenter', function (e) {

        _this.hoveredDate = e.target.value;
      });
    });
  };

  window.Calendar = document.registerElement(config.calendarComponent, {
    prototype: Calendar
  });
})(window, document);