'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateParts = date.split(fromFormat[fromFormat.length - 1]);

  const yearIndexFrom = fromFormat.includes('YY')
    ? fromFormat.indexOf('YY')
    : fromFormat.indexOf('YYYY');
  const monthIndexFrom = fromFormat.indexOf('MM');
  const dayIndexFrom = fromFormat.indexOf('DD');

  const yearIndexTo = toFormat.includes('YY')
    ? toFormat.indexOf('YY') : toFormat.indexOf('YYYY');
  const monthIndexTo = toFormat.indexOf('MM');
  const dayIndexTo = toFormat.indexOf('DD');

  const yearValue = dateParts[yearIndexFrom];
  const monthValue = dateParts[monthIndexFrom];
  const dayValue = dateParts[dayIndexFrom];

  const newYearFormat = changeYearFormat(yearValue, fromFormat, toFormat);

  const newDate = [];

  newDate[dayIndexTo] = dayValue;
  newDate[monthIndexTo] = monthValue;
  newDate[yearIndexTo] = newYearFormat;

  return newDate.join(toFormat[toFormat.length - 1]);
}

function changeYearFormat(year, formatFrom, formatTo) {
  let newYearFormat = year;

  if (formatFrom.includes('YY') && formatTo.includes('YYYY')) {
    newYearFormat = +year < 30 ? `20${year}` : `19${year}`;
  }

  if (formatFrom.includes('YYYY') && formatTo.includes('YY')) {
    newYearFormat = year.slice(2);
  }

  return newYearFormat;
}

module.exports = formatDate;
