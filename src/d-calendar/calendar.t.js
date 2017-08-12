module.exports = data => `<div class="js-component hidden">
  <div class="arrow"></div>
  <div class="d-calendar-popup">
    <div class="d-calendar animate">
      <button type="button" class="d-calender-navigation-previous">&lArr;</button>
      <button type="button" class="d-calender-navigation-next">&lArr;</button>
      <div class="d-calendar-row">
        ${data.months.map(month => data.monthTagTemplate(month)).join('')}
      </div>
    </div>
  </div>
</div>`;
