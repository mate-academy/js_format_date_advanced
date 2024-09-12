'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separator = fromFormat[3];
  const newSeparator = toFormat[3];

  const DAY_MARK = 'DD';
  const MONTH_MARK = 'MM';
  const YEAR_MARK = 'YY';

  const givenDate = date.split(separator);

  let day = '';
  let month = '';
  let year = '';
  let oldYearFormat = '';

  for (let i = 0; i < fromFormat.length - 1; i++) {
    switch (fromFormat[i]) {
      case DAY_MARK:
        day = givenDate[i];
        break;

      case MONTH_MARK:
        month = givenDate[i];
        break;

      default:
        year = givenDate[i];
        oldYearFormat = fromFormat[i];
    }
  }

  // add items to array in corrent order
  const newDate = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    switch (toFormat[i]) {
      case DAY_MARK:
        newDate.push(day);
        break;

      case MONTH_MARK:
        newDate.push(month);
        break;

      default:
        // check if year formats are the same
        if (oldYearFormat !== toFormat[i]) {
          if (oldYearFormat === YEAR_MARK) {
            year = (year >= 30) ? ('19' + year) : ('20' + year);
          } else {
            year = year.slice(2);
          }
        }
        newDate.push(year);
    }
  }

  return newDate.join(newSeparator);
}

module.exports = formatDate;
