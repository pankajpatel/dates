module.exports = data => `<button
    type="button" ${data.disabled} value="${data.day.format('YYYY-MM-DD')}"
    class="d-calendar-day-button ${data.class || ''}" data-date="${data.day.format('YYYY-MM-DD')}">
    ${data.day.format('D')}
  </button>`;
