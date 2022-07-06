"use strict";

module.exports = function (data) {
  return "<button\n    type=\"button\" ".concat(data.disabled ? "disabled" : "", " value=\"").concat(data.day.format("YYYY-MM-DD"), "\"\n    class=\"d-calendar-day-button ").concat(data["class"] || "", " ").concat(data.highlighted ? "d-day-highlighted" : "", " ").concat(data.selected ? "d-day-selected" : "", "\" data-date=\"").concat(data.day.format("YYYY-MM-DD"), "\">\n    ").concat(data.day.format("D"), "\n  </button>");
};