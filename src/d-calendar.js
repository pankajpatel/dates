const moment = require('moment');
const monthWeeks = require('./utils/getWeeks');
const getMonths = require('./utils/getMonths');
const template = require('./templates/calendar.t');
const monthTagTemplate = require('./templates/month.tag.t');

const $find = (selector, context = document) => Array.prototype.slice.apply( context.querySelectorAll(selector) );

const directionalFunction = bool => bool ? 'add' : 'subtract';

(function(window, document, undefined) {
  // moment.locale('en');
  moment.locale('de');

  var Calendar = Object.create(HTMLElement.prototype);

  Calendar.createdCallback = function() {
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

    //Set default month element's width
    this.monthWidth = 0;

    //Flag for the Navigation of months
    this.navFlag = 0;

    let value = this.querySelector(this.input).value;

    let conf = getMonths(this.monthCount, value);

    this.months = conf.months;
    this.monthsMap = conf.map;
    // this.activeMonths = [moment(new Date).format['YYYYMM']];
    this.innerHTML += template({months: this.months, monthTagTemplate});

    this._component = this.querySelector('.js-component');
    this.getWidth = () => this.querySelector('d-month').getBoundingClientRect().width;
    this.close = (e, force) => {
      setTimeout(() => {
        if(force || !this.querySelectorAll(':focus').length){
          this._component.classList.add('hidden');
        }
      }, 100);
    }

    this.updateWidth = width => {
      this.monthWidth = width || this.getWidth();
      this._component.style.width = (this.monthWidth * this.monthCount) + 'px';
    }
    this.slide = () => {
      this._component.querySelector('.d-calendar').style.marginLeft = `-${this.monthWidth * this.navFlag}px`;
    }
    this.moveNext = (step) => {
      for (var index = 0; index < this.step; index++) {
        let month = this.months[this.months.length - 1].add(1, 'month');
        this.months.push(month);
        this.monthsMap[month.format('YYYYMM')] = month;
        let temp_container = document.createElement('div');
        temp_container.innerHTML = monthTagTemplate(month);
        while(temp_container.firstChild){
          this.querySelector('.d-calendar-row').appendChild(temp_container.firstChild);
        }
        this.navFlag++;
        console.log(this.navFlag, `-${this.monthWidth * this.navFlag}px`);
        this.slide();
        // console.log(month);
      }
      // console.log(this.months);
    }
    this.movePrevious = () => {
      for (var index = 0; index < this.step; index++) {
        this.navFlag--;
        console.log(this.navFlag, `-${this.monthWidth * this.navFlag}px`);
        this.slide();
      }
    }

    $find(this.input, this).forEach(el => {
      el.addEventListener(this.openEvent, (e) => {
        this._component.classList.remove('hidden');
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

    this.cosmetics = (direction) => {
      let monthWidth = this.getWidth();
      if(this.monthWidth != monthWidth){
        this.updateWidth(monthWidth);

      }
    }
    this.querySelector('.d-calender-navigation-previous').addEventListener('click', (e) => {
      this.movePrevious();
      this.cosmetics();
    })
    this.querySelector('.d-calender-navigation-next').addEventListener('click', (e) => {
      this.moveNext();
      this.cosmetics();
    })
    $find('.d-calendar-day-button', this).forEach(el => {
      el.addEventListener('mouseenter', e => {

        this.hoveredDate = e.target.value;
      })
    });
  };

  window.Calendar = document.registerElement('d-calendar', {
    prototype: Calendar
  });
})(window, document);
