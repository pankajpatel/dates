module.exports = data => `<button type="button" ${data.disabled}
    class="d-calendar-day-button" data-date="${data.day.format('YYYY-MM-DD')}">
    ${data.day.format('D')}
  </button>`;
