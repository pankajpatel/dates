const monthWeeks = require('./utils/getCalendarMonthWeeks');
const template = require('./templates/calendar.t');

(function(window, document, undefined) {
  var thatDoc = document;

  var Calendar = Object.create(HTMLElement.prototype);

  Calendar.createdCallback = function() {
    const moment = require('moment');
    var monthCount = parseInt(this.getAttribute('months'));
    monthCount = isNaN(monthCount) ? 1: monthCount;
    const months = [];
    for(let i = 0; i < monthCount; i++) {
      let date = moment(new Date());
      if(i > 0){
        date = date[(i%2 ? 'add' : 'subtract')](parseInt((i+1)/2), 'month');
      }
      months.push(date);
    }
    months.sort((a,b) => a.get('month') - b.get('month'));

    this.innerHTML += template({months, moment});
    this._component = this.querySelector('.js-component');
    const openEvent = this.getAttribute('open-event');
    const closeEvent = this.getAttribute('close-event');

    Array.prototype.slice.apply(document.querySelectorAll(this.getAttribute('on'))).forEach(el => {
      el.addEventListener(openEvent, (e) => {
        // let pos = el.getBoundingClientRect()
        // this._component.style.top = pos.bottom + 'px';
        // this._component.style.left = pos.left + 'px';
        this._component.classList.remove('hidden');
      })
      el.addEventListener(closeEvent, (e) => {
        setTimeout(() => {
          if(!this.querySelectorAll(':focus').length){
            this._component.classList.add('hidden');
          }
        }, 150);
      })
    });
    this.addEventListener('click', (e) => {
      if(e.target.classList.contains('d-calendar-day-button')){
        let value = e.target.dataset.date;
        console.log(value);
        Array.prototype.slice.apply(document.querySelectorAll(this.getAttribute('on'))).forEach(el => {
          el.value = value;
        })
      }
    })
  };

  window.Calendar = thatDoc.registerElement('d-calendar', {
    prototype: Calendar
  });
})(window, document);
