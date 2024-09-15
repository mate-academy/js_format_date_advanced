'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const DAY = 'DD';
  const MONTH = 'MM';
  const SHORT_YEAR = 'YY';
  const LONG_YEAR = 'YYYY';
  const TWENTIETH = '20';
  const NINETEENTH = '19';
  const CENTURY_INDICATOR = 30;

  const dates = date.split(fromFormat[fromFormat.length - 1]);
  const newDate = [];

  for (let i = 0; i < dates.length; i++) {
    switch (toFormat[i]) {
      case DAY:
        newDate.push(dates[fromFormat.indexOf(DAY)]);
        break;
      case MONTH:
        newDate.push(dates[fromFormat.indexOf(MONTH)]);
        break;
      case SHORT_YEAR:
        if (fromFormat.includes(SHORT_YEAR)) {
          newDate.push(dates[fromFormat.indexOf(SHORT_YEAR)]);
        } else {
          newDate.push(dates[fromFormat.indexOf(LONG_YEAR)].slice(2));
        }
        break;
      case LONG_YEAR:
        if (fromFormat.includes(LONG_YEAR)) {
          newDate.push(dates[fromFormat.indexOf(LONG_YEAR)]);
        } else if (+dates[fromFormat.indexOf(SHORT_YEAR)] < CENTURY_INDICATOR) {
          newDate.push(TWENTIETH + dates[fromFormat.indexOf(SHORT_YEAR)]);
        } else {
          newDate.push(NINETEENTH + dates[fromFormat.indexOf(SHORT_YEAR)]);
        }
        break;
    }
  }

  return newDate.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
