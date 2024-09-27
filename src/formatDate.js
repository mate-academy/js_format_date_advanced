'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldDate = date.split(fromFormat[3]);
  const newDate = [];

  const oldYear = fromFormat.includes('YYYY')
    ? fromFormat.indexOf('YYYY') : fromFormat.indexOf('YY');
  const oldMonth = fromFormat.indexOf('MM');
  const oldDay = fromFormat.indexOf('DD');

  const newYear = toFormat.includes('YYYY')
    ? toFormat.indexOf('YYYY') : toFormat.indexOf('YY');
  const newMonth = toFormat.indexOf('MM');
  const newDay = toFormat.indexOf('DD');

  switch (true) {
    case fromFormat[oldYear] === toFormat[newYear]:
      newDate[newYear] = oldDate[oldYear];
      break;

    case fromFormat[oldYear] > toFormat[newYear]:
      newDate[newYear] = oldDate[oldYear].slice(-2);
      break;

    case fromFormat[oldYear] < toFormat[newYear]:
      newDate[newYear] = +oldDate[oldYear] < 30
        ? '20' + oldDate[oldYear] : '19' + oldDate[oldYear];
  }

  newDate[newMonth] = oldDate[oldMonth];
  newDate[newDay] = oldDate[oldDay];

  return newDate.join(toFormat[3]);
}

module.exports = formatDate;
