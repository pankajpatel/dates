const monthWeeks = require('./utils/getCalendarMonthWeeks');

(function(window, document, undefined) {
  var thatDoc = document;

  var thisDoc =  (thatDoc._currentScript || thatDoc.currentScript).ownerDocument;

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

    var html = `
    <div>
      <div class="d-calendar">
        <button class="d-calender-navigation-previous">&lt;</button>
        <button class="d-calender-navigation-next">&gt;</button>
        <div class="d-calendar-row">
          ${months.map(month => `<d-month for-month="${moment(month).format('YYYY-MM-DD')}"></d-month>`).join('')}
        </div>
      </div>
    </div>`;
    this.innerHTML = html;
    this.addEventListener('click', (e) => {
      if(e.target.classList.contains('d-calendar-day')){
        let value = e.target.dataset.date;
        console.log(value);
        Array.prototype.slice.apply(document.querySelectorAll(this.getAttribute('on'))).forEach(el => {
          el.value = value;
        })
      }
    })
    const openEvent = this.getAttribute('open-event');
    const closeEvent = this.getAttribute('close-event');
    Array.prototype.slice.apply(document.querySelectorAll(this.getAttribute('on'))).forEach(el => {
      el.addEventListener(openEvent, (e) => {
        let pos = el.getBoundingClientRect()
        this.style.position = 'absolute';
        this.style.top = pos.bottom + 'px';
        this.style.left = pos.left + 'px';
        this.removeAttribute('hidden');
      })
      el.addEventListener(closeEvent, (e) => {
        setTimeout(() => {
          this.setAttribute('hidden', true);
        }, 100);
      })
    })
  };

  window.Calendar = thatDoc.registerElement('d-calendar', {
    prototype: Calendar
  });
})(window, document);
