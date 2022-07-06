"use strict";

var config = require("../config");

module.exports = function (data) {
  return "<div class=\"d-calendar-month\">\n  <table>\n    <caption>\n      <strong>".concat(data.monthTitle, "</strong>\n      <ul>\n        <li><small>").concat(data.moment().weekday(7).format("dd"), "</small></li>\n        <li><small>").concat(data.moment().weekday(1).format("dd"), "</small></li>\n        <li><small>").concat(data.moment().weekday(2).format("dd"), "</small></li>\n        <li><small>").concat(data.moment().weekday(3).format("dd"), "</small></li>\n        <li><small>").concat(data.moment().weekday(4).format("dd"), "</small></li>\n        <li><small>").concat(data.moment().weekday(5).format("dd"), "</small></li>\n        <li><small>").concat(data.moment().weekday(6).format("dd"), "</small></li>\n      </ul>\n    </caption>\n    <tbody>\n").concat(data.weeks.map(function (week) {
    return "<tr>\n  ".concat(week.map(function (day) {
      var disabled = "";
      var outOfMonth = "";

      if (day && data.month && day.month() !== data.month.month()) {
        disabled = "disabled";
        outOfMonth = "out-of-month";
      } // const selected = day.date() === 15 ? 'selected' : '';
      // const highlighted = day.date() === 18 ? 'highlighted' : '';


      var selected = "";
      var highlighted = "";
      var d = day.format("YYYY-MM-DD");
      return "<td class=\"d-calendar-day\n      ".concat(disabled, " ").concat(selected, " ").concat(highlighted, "\" date=\"").concat(d, "\"\n      ><").concat(config.dayComponent, "\n        ").concat(disabled, " ").concat(selected, " ").concat(highlighted, "\n        date=\"").concat(d, "\" ").concat(outOfMonth, "\n        >").concat(day.format("D"), "</").concat(config.dayComponent, "\n      ></td>");
    }).join(""), "\n</tr>");
  }).join(""), "\n    </tbody>\n  </table>\n</div>");
};