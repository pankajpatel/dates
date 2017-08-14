module.exports = data => `
<${data.config.calendarComponent} range
  ${data.attrs.map(item => `${item.name}="${item.value}"`).join(' ')}
>${data.contents}</${data.config.calendarComponent}>
`;
