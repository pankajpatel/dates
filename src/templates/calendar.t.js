module.exports = data => `<div class="js-component hidden">
  <div class="d-calendar">
    <button class="d-calender-navigation-previous">&lt;</button>
    <button class="d-calender-navigation-next">&gt;</button>
    <div class="d-calendar-row">
      ${data.months.map(month => `<d-month for-month="${data.moment(month).format('YYYY-MM-DD')}"></d-month>`).join('')}
    </div>
  </div>
</div>`;
