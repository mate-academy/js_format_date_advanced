'use strict';

function formatDate(date, fromFormat, toFormat) {
  const dateArr = date.split(`${fromFormat[fromFormat.length - 1]}`);
  const result = [];
  const dateObject = {};

  for (let i = 0; i < dateArr.length; i++) {
    dateObject[fromFormat[i]] = [dateArr[i]];
  }

  for (let i = 0; i < toFormat.length; i++) {
    if (dateObject[toFormat[i]]) {
      result.push(dateObject[toFormat[i]]);
    }

    if (toFormat[i] === 'YY' && dateObject['YYYY']) {
      result.push(dateObject['YYYY'].join().slice(2));
    } else if (toFormat[i] === 'YYYY' && dateObject['YY']) {
      const year = dateObject['YY'] < 30
        ? '20' + dateObject['YY']
        : '19' + dateObject['YY'];

      result.push(year);
    }
  }

  return result.join(`${toFormat[toFormat.length - 1]}`);
}

module.exports = formatDate;
