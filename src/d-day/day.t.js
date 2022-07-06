module.exports = (data) => `<button
    type="button" ${data.disabled ? "disabled" : ""} value="${data.day.format(
  "YYYY-MM-DD"
)}"
    class="d-calendar-day-button ${data.class || ""} ${
  data.highlighted ? "d-day-highlighted" : ""
} ${data.selected ? "d-day-selected" : ""}" data-date="${data.day.format(
  "YYYY-MM-DD"
)}">
    ${data.day.format("D")}
  </button>`;
