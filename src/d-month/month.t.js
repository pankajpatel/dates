const config = require("../config");

module.exports = (data) => `<div class="d-calendar-month">
  <table>
    <caption>
      <strong>${data.monthTitle}</strong>
      <ul>
        <li><small>${data.moment().weekday(7).format("dd")}</small></li>
        <li><small>${data.moment().weekday(1).format("dd")}</small></li>
        <li><small>${data.moment().weekday(2).format("dd")}</small></li>
        <li><small>${data.moment().weekday(3).format("dd")}</small></li>
        <li><small>${data.moment().weekday(4).format("dd")}</small></li>
        <li><small>${data.moment().weekday(5).format("dd")}</small></li>
        <li><small>${data.moment().weekday(6).format("dd")}</small></li>
      </ul>
    </caption>
    <tbody>
${data.weeks
  .map(
    (week) => `<tr>
  ${week
    .map((day) => {
      let disabled = "";
      let outOfMonth = "";
      if (day && data.month && day.month() !== data.month.month()) {
        disabled = "disabled";
        outOfMonth = "out-of-month";
      }
      // const selected = day.date() === 15 ? 'selected' : '';
      // const highlighted = day.date() === 18 ? 'highlighted' : '';
      const selected = "";
      const highlighted = "";
      const d = day.format("YYYY-MM-DD");
      return `<td class="d-calendar-day
      ${disabled} ${selected} ${highlighted}" date="${d}"
      ><${config.dayComponent}
        ${disabled} ${selected} ${highlighted}
        date="${d}" ${outOfMonth}
        >${day.format("D")}</${config.dayComponent}
      ></td>`;
    })
    .join("")}
</tr>`
  )
  .join("")}
    </tbody>
  </table>
</div>`;
