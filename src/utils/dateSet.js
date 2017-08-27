const moment = require('moment');

export default (startDate, stopDate, callbackForEach) => {
  const dateArray = [];
  let currentDate = moment(startDate);
  const endDate = moment(stopDate);
  while (currentDate <= endDate) {
    const newDate = moment(currentDate).format('YYYY-MM-DD');
    dateArray.push(newDate);
    callbackForEach(newDate, dateArray.length);
    currentDate = moment(currentDate).add(1, 'days');
  }
  return dateArray;
};
