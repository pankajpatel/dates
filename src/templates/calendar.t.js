module.exports = data => `<div class="js-component hidden">
  <div class="d-calendar">
    <button type="button" class="d-calender-navigation-previous">&lt;</button>
    <button type="button" class="d-calender-navigation-next">&gt;</button>
    <div class="d-calendar-row">
      ${data.months.map(month => data.monthTagTemplate(month)).join('')}
    </div>
  </div>
</div>`;
