"use strict";

module.exports = function (data) {
  return "\n".concat(data.contents, "\n<div class=\"js-component hidden\">\n<div class=\"arrow\"></div>\n<div class=\"d-calendar-popup\">\n  <").concat(data.config.calendarComponent, "\n  ").concat(data.attrs.map(function (item) {
    return "".concat(item.name, "=\"").concat(item.value, "\"");
  }).join(" "), "\n  ></").concat(data.config.calendarComponent, ">\n</div>\n</div>");
};