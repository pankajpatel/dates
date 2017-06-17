const moment = require('moment');
const monthWeeks = require('./utils/getCalendarMonthWeeks');
const template = require('./templates/calendar.t');
const monthTagTemplate = require('./templates/month.tag.t');

const $find = (context, selector) => Array.prototype.slice.apply( context.querySelectorAll(selector) );
const directionalFunction = bool => bool ? 'add' : 'subtract';
const getMonths = (count) => {
  const months = [];
  for(let i = 0; i < count; i++) {
    let date = moment(new Date());
    let direction = Boolean(i%2);
    let num = parseInt((i+1)/2);
    if(i > 0){
      date = date[direction ? 'add' : 'subtract'](num, 'month');
    }
    months.push(date);
  }
  months.sort((a,b) => a.get('month') - b.get('month'));
  return months;
}

(function(window, document, undefined) {

  var Calendar = Object.create(HTMLElement.prototype);

  Calendar.createdCallback = function() {
    this.monthCount = parseInt(this.getAttribute('months'));
    this.monthCount = isNaN(this.monthCount) ? 1: this.monthCount;

    this.step = parseInt(this.getAttribute('step') || 1);
    this.step = this.step > this.monthCount ? this.monthCount : this.step;

    this.months = getMonths(this.monthCount);
    this.innerHTML += template({months: this.months, monthTagTemplate});

    this._component = this.querySelector('.js-component');
    this.openEvent = this.getAttribute('open-event');
    this.closeEvent = this.getAttribute('close-event');

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
        var temp_container = document.createElement('div');
        temp_container.innerHTML = monthTagTemplate(month);
        while(temp_container.firstChild){
          this.querySelector('.d-calendar-row').appendChild(temp_container.firstChild);
        }
        console.log(month);
      }
      console.log(this.months);
    }
    this.movePrevious = () => {

    }

    $find(this, this.getAttribute('on')).forEach(el => {
      el.addEventListener(this.openEvent, (e) => {
        this._component.classList.remove('hidden');
      })
      el.addEventListener(this.closeEvent, this.close)
    });
    this.addEventListener('click', (e) => {
      if(e.target.classList.contains('d-calendar-day-button')){
        this.value = e.target.value;
        console.log(this.value);
        e.target.classList.add('selected');
        // this.close(e, true);
        $find(this, this.getAttribute('on')).forEach(el => {
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
    $find(this, '.d-calendar-day-button').forEach(el => {
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
