module.exports = data => `
${data.contents}
<${data.config.calendarComponent} range
  ${data.attrs.map(item => `${item.name}="${item.value}"`).join(' ')}
></${data.config.calendarComponent}>
`;
