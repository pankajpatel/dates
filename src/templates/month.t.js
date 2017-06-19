module.exports = data => `<div class="d-calendar-month">
  <table>
    <caption>
      <strong>${data.monthTitle}</strong>
      <ul>
        <li><small>${data.moment().weekday(7).format('dd')}</small></li>
        <li><small>${data.moment().weekday(1).format('dd')}</small></li>
        <li><small>${data.moment().weekday(2).format('dd')}</small></li>
        <li><small>${data.moment().weekday(3).format('dd')}</small></li>
        <li><small>${data.moment().weekday(4).format('dd')}</small></li>
        <li><small>${data.moment().weekday(5).format('dd')}</small></li>
        <li><small>${data.moment().weekday(6).format('dd')}</small></li>
      </ul>
    </caption>
    <tbody>
      ${data.weeks.map(week => `<tr>
        ${week.map(day => {
          const disabled = (day && data.month && day.month() !== data.month.month()) ? 'disabled' : '';
          return `<td class="d-calendar-day ${disabled}"><d-day disabled="${disabled}"
          date="${day.format('YYYY-MM-DD')}">${day.format('D')}</d-day></td>`}).join('')}
        </tr>`).join('')}
    </tbody>
  </table>
</div>`
