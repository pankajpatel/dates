const moment = require('moment');
const monthWeeks = require('./utils/getWeeks');
const getMonths = require('./utils/getMonths');
const template = require('./templates/calendar.t');
const monthTagTemplate = require('./templates/month.tag.t');

// moment.locale('en');
moment.locale('de');

const $find = (selector, context = document) => Array.prototype.slice.apply( context.querySelectorAll(selector) );

const directionalFunction = bool => bool ? 'add' : 'subtract';

(function(window, document, undefined) {

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

    let conf = getMonths(this.monthCount)

    this.months = conf.months;
    this.monthsMap = conf.map;
    this.activeMonths = [moment(new Date).format['YYYYMM']];
    this.innerHTML += template({months: this.months, monthTagTemplate});

    this._component = this.querySelector('.js-component');

    this.close = (e, force) => {
      setTimeout(() => {
        if(force || !this.querySelectorAll(':focus').length){
          this._component.classList.add('hidden');
        }
      }, 100);
    }

    this.moveNext = (step) => {
      for (var index = 0; index < this.step; index++) {
        let month = this.months[this.months.length - 1].add(1, 'month');
        this.months.push(month);
        this.monthsMap[month.format('YYYYMM')] = month;
        let temp_container = document.createElement('div');
        temp_container.innerHTML = monthTagTemplate(month);
        console.log(temp_container.firstChild.getBoundingClientRect())
        while(temp_container.firstChild){
          this.querySelector('.d-calendar-row').appendChild(temp_container.firstChild);
        }
        this._component.querySelector('.d-calendar').style.marginLeft = `-${this.monthWidth}px`;
        console.log(month);
      }
      console.log(this.months);
    }
    this.movePrevious = () => {

    }

    $find(this.input, this).forEach(el => {
      el.addEventListener(this.openEvent, (e) => {
        this._component.classList.remove('hidden');
        if(!this.monthWidth) {
          this.monthWidth = this.querySelector('d-month').getBoundingClientRect().width;
          this._component.style.width = this.monthWidth + 'px';
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
      console.log(e)
      this.movePrevious();
    })
    this.querySelector('.d-calender-navigation-next').addEventListener('click', (e) => {
      console.log(e)
      this.moveNext();
    })
    $find('.d-calendar-day-button', this).forEach(el => {
      el.addEventListener('mouseenter', e => {

        this.hoveredDate = e.target.value;
        console.log(this.hoveredDate)
      })
    });
  };

  window.Calendar = document.registerElement('d-calendar', {
    prototype: Calendar
  });
})(window, document);
