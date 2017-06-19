const moment = require('moment');
module.exports = (count) => {
  const months = [];
  let monthMap = {};
  for(let i = 0; i < count; i++) {
    let date = moment(new Date());
    let direction = Boolean(i%2);
    let num = parseInt((i+1)/2);
    if(i > 0){
      date = date[direction ? 'add' : 'subtract'](num, 'month');
    }
    months.push(date);
    monthMap[date.format('YYYYMM')] = date;
  }
  months.sort((a,b) => a.get('month') - b.get('month'));
  return {months, map: monthMap};
}
