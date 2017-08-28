const moment = require('moment');

export default (startDate, stopDate, callbackForEach) => {
  const dateArray = [];
  const input = [moment(startDate), moment(stopDate)].sort((a, b) => a - b);
  let currentDate = input[0];
  const endDate = input[1];
  while (currentDate <= endDate) {
    const newDate = moment(currentDate).format('YYYY-MM-DD');
    dateArray.push(newDate);
    callbackForEach(newDate, dateArray.length);
    currentDate = moment(currentDate).add(1, 'days');
  }
  return dateArray;
};
