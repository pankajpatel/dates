const moment = require('moment');
const config = require('../config');
const monthWeeks = require('../utils/getWeeks');
const getMonths = require('../utils/getMonths');
const template = require('./calendar.t');
const monthTagTemplate = require('./month.tag.t');
const { $find, $append, $prepend } = require('../utils/dom');

require('./d-calendar.scss');
require('../d-month/d-month');

(function(window, document, undefined) {
  moment.locale('en');
  // moment.locale('de');
  console.log('Story')
  var Calendar = Object.create(HTMLElement.prototype);

  Calendar.createdCallback = function() {
    let value = null;
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

    if( this.range ) {
      value = {
        from: this.querySelector('.from').value,
        to: this.querySelector('.to').value
      };
    } else {
      value = this.querySelector(this.input).value;
    }

    let conf = getMonths(this.monthCount, value);

    this.months = conf.months;
    this.monthsMap = conf.map;
    // this.activeMonths = [moment(new Date).format['YYYYMM']];
    this.innerHTML += template({months: this.months, monthTagTemplate});

    this._component = this.querySelector('.js-component');
    this.getWidth = () => this.querySelector(config.monthComponent).getBoundingClientRect().width;
    this.close = (e, force) => {
      setTimeout(() => {
        if(force || !this.querySelectorAll(':focus').length){
          this._component.classList.add('hidden');
          this.querySelector(this.input).classList.remove('d-focused')
        }
      }, 100);
    }

    this.updateWidth = width => {
      this.monthWidth = width || this.getWidth();
      this._component.style.width = (this.monthWidth * this.monthCount) + 'px';
    }
    this.slideLeft = () => {
      this._component.querySelector('.d-calendar').style.marginLeft = `-${this.monthWidth * this.navFlag}px`;
    }
    this.slideRight = () => {
      let cal = this._component.querySelector('.d-calendar');
      cal.classList.remove('animate');
      cal.style.marginLeft = `-${this.monthWidth * this.navFlag}px`;
      cal.classList.add('animate');
    }
    this.moveNext = (step) => {
      for (var index = 0; index < this.step; index++) {
        this.navFlag++;
        if(!this.months[this.navFlag]){
          let month = this.months[this.months.length - 1].add(1, 'month');
          if(!this.monthsMap[month.format('YYYYMM')]) {
            this.months.push(month);
            this.monthsMap[month.format('YYYYMM')] = month;
            $append(monthTagTemplate(month), this.querySelector('.d-calendar-row'));
          }
        }
        this.slideLeft();
      }
    }

    /**
     *
     */
    this.movePrevious = () => {
      for (var index = 0; index < this.step; index++) {
        console.log(this.navFlag)
        if(this.navFlag == 0){
          let month = this.months[0].subtract(1, 'month');
          if(!this.monthsMap[month.format('YYYYMM')]) {
            this.months.unshift(month);
            this.monthsMap[month.format('YYYYMM')] = month;
            $prepend(monthTagTemplate(month), this.querySelector('.d-calendar-row'));
          }
        } else {
          this.navFlag--;
          this.slideRight();
        }
      }
    }

    $find(this.input, this).forEach(el => {
      el.addEventListener(this.openEvent, (e) => {
        this._component.classList.remove('hidden');
        this.querySelector(this.input).classList.add('d-focused')
        if(!this.monthWidth) {
          this.updateWidth();
        }
      })
      el.addEventListener(this.closeEvent, this.close)
    });
    this.addEventListener('click', (e) => {
      if(e.target.classList.contains('d-calendar-day-button')){
        this.value = e.target.value;
        console.log(this.value);
        e.target.classList.add('selected');
        // this.close(e, true);
        $find(this.input, this).forEach(el => {
          el.value = this.value;
        })
      }
    });

    this.querySelector('.d-calender-navigation-previous').addEventListener('click', (e) => {
      this.movePrevious();
    })
    this.querySelector('.d-calender-navigation-next').addEventListener('click', (e) => {
      this.moveNext();
    })
    $find('.d-calendar-day-button', this).forEach(el => {
      el.addEventListener('mouseenter', e => {

        this.hoveredDate = e.target.value;
      })
    });
  };

  window.Calendar = document.registerElement(config.calendarComponent, {
    prototype: Calendar
  });
})(window, document);
