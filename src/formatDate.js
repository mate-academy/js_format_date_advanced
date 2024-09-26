'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // write code here
  const oldSeparator = fromFormat[3];
  const newSeparator = toFormat[3];
  const oldDate = date.split(oldSeparator);
  const oldYearFormat = fromFormat.includes('YYYY') ? 'YYYY' : 'YY';
  const newYearFormat = toFormat.includes('YYYY') ? 'YYYY' : 'YY';
  const oldYearPosition = fromFormat.includes('YYYY')
    ? fromFormat.indexOf('YYYY') : fromFormat.indexOf('YY');
  const newYearPosition = toFormat.includes('YYYY')
    ? toFormat.indexOf('YYYY') : toFormat.indexOf('YY');

  const newDate = [];

  // find a day and a month
  newDate[toFormat.indexOf('DD')] = oldDate[fromFormat.indexOf('DD')];
  newDate[toFormat.indexOf('MM')] = oldDate[fromFormat.indexOf('MM')];

  // find a year
  fromFormat.indexOf('YYYY', 'YY');

  switch (oldYearFormat) {
    case newYearFormat: {
      newDate[newYearPosition]
        = oldDate[oldYearPosition];
      break;
    }

    case 'YYYY': {
      newDate[newYearPosition]
        = oldDate[oldYearPosition].slice(2, 4);
      break;
    }

    default: {
      if (+oldDate[oldYearPosition] >= 30) {
        newDate[newYearPosition]
          = '19' + oldDate[oldYearPosition];
      } else {
        newDate[newYearPosition]
          = '20' + oldDate[oldYearPosition];
      }
    }
  }

  return newDate.join(newSeparator);
}

module.exports = formatDate;
