"use strict";

module.exports = function (data) {
  return "\n".concat(data.contents, "\n<").concat(data.config.calendarComponent, " range\n  ").concat(data.attrs.map(function (item) {
    return "".concat(item.name, "=\"").concat(item.value, "\"");
  }).join(" "), "\n></").concat(data.config.calendarComponent, ">\n");
};