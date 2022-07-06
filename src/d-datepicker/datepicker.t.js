module.exports = (data) => `
${data.contents}
<div class="js-component hidden">
<div class="arrow"></div>
<div class="d-calendar-popup">
  <${data.config.calendarComponent}
  ${data.attrs.map((item) => `${item.name}="${item.value}"`).join(" ")}
  ></${data.config.calendarComponent}>
</div>
</div>`;
