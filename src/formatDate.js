'use strict';

function formatDate(date, fromFormat, toFormat) {
  const oldDate = date.split(fromFormat[3]);
  const result = [];
  let newYearLength;
  let newYearIndex;
  const dateObj = {
    day: '',
    month: '',
    year: '',
  };

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i] === 'DD') {
      dateObj.day = oldDate[i];
    } else if (fromFormat[i] === 'MM') {
      dateObj.month = oldDate[i];
    } else if (fromFormat[i] === 'YY' || fromFormat[i] === 'YYYY') {
      dateObj.year = oldDate[i];
    }
  }

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i] === 'DD') {
      result.push(dateObj.day);
    } else if (toFormat[i] === 'MM') {
      result.push(dateObj.month);
    } else if (toFormat[i] === 'YY' || toFormat[i] === 'YYYY') {
      newYearLength = toFormat[i].length;
      newYearIndex = i;
      result.push(dateObj.year);
    }
  }

  if (dateObj.year.length > newYearLength) {
    dateObj.year = dateObj.year.slice(-newYearLength);
    result[newYearIndex] = dateObj.year;
  }

  if (newYearLength > dateObj.year.length) {
    const yearNumber = parseInt(dateObj.year);

    if (yearNumber < 30) {
      dateObj.year = '20' + dateObj.year;
    } else {
      dateObj.year = '19' + dateObj.year;
    }
    result[newYearIndex] = dateObj.year;
  }

  return result.join(toFormat[3]);
}

module.exports = formatDate;
