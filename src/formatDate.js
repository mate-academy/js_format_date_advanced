'use strict';

function formatDate(date, fromFormat, toFormat) {
  const YEARS_FOR_CENTURY_CHANGING = 30;
  const fromFormatSeparator = fromFormat[3];
  const toFormatSeparator = toFormat[3];
  const dateFromFormatArr = date.split(fromFormatSeparator);
  const dateToFormatArr = [];
  const dateObject = {};

  for (const [indx, val] of fromFormat.entries()) {
    dateObject[val] = dateFromFormatArr[indx];
  }

  if (dateObject['YYYY'] && toFormat.includes('YY')) {
    dateObject['YY'] = dateObject['YYYY'].slice(2);
  }

  if (dateObject['YY'] && toFormat.includes('YYYY')) {
    if (+dateObject['YY'] < YEARS_FOR_CENTURY_CHANGING) {
      dateObject['YYYY'] = '20' + dateObject['YY'];
    } else {
      dateObject['YYYY'] = '19' + dateObject['YY'];
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    dateToFormatArr[i] = dateObject[toFormat[i]];
  }

  return dateToFormatArr.join(toFormatSeparator);
}

module.exports = formatDate;
