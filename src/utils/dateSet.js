const moment = require('moment');
export default (startDate, stopDate, callbackForEach) => {
  const dateArray = new Array();
  let currentDate = startDate;
  while (currentDate <= stopDate) {
    let newDate = moment(currentDate).format('YYYY-MM-DD');
    dateArray.push( newDate )
    callbackForEach(newDate, dateArray.length);
    currentDate = moment(currentDate).add(1, 'days');
  }
  return dateArray;
}
