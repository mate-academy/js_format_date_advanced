'use strict';

/**
 *   Time flies, standards change. Let's get rid of the routine of changing the
 * date format. Create a `formatDate` function that accepts the `date` string,
 * the old `fromFormat` array and the new `toFormat` array. Function returns
 * given date in new format.
 *   The function can change a separator, reorder the date parts of convert a
 * year from 4 digits to 2 digits and back.
 *   When converting from YYYY to YY just use 2 last digit (1997 -> 97).
 *   When converting from YY to YYYY use 20YY if YY < 30 and 19YY otherwise.
 *
 * Examples:
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.2020'
 *
 * formatDate(
 *   '18-02-2020',
 *   ['DD', 'MM', 'YYYY', '-'],
 *   ['DD', 'MM', 'YY', '/'],
 * ) // '18/02/20'
 *
 * formatDate(
 *   '20/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '97/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.1997'
 *
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  // ABBR stands for `ABBREVIATION`
  const SHORT_YEAR_ABBR = 'YY';
  const LONG_YEAR_ABBR = 'YYYY';
  const MONTH_ABBR = 'MM';
  const DAY_ABBR = 'DD';
  const SEPARATOR_INDEX = 3;
  const MAX_YEAR = 30;

  const dateArray = date.split(fromFormat[SEPARATOR_INDEX]);
  const getYearFormatIndex = (format) => {
    return format.indexOf(SHORT_YEAR_ABBR) !== -1
      ? format.indexOf(SHORT_YEAR_ABBR)
      : format.indexOf(LONG_YEAR_ABBR);
  };

  const year = dateArray[getYearFormatIndex(fromFormat)];
  const month = dateArray[fromFormat.indexOf(MONTH_ABBR)];
  const day = dateArray[fromFormat.indexOf(DAY_ABBR)];

  let result = '';

  for (let i = 0; i < toFormat.length - 1; i++) {
    switch (toFormat[i]) {
      case SHORT_YEAR_ABBR:
        result += year.length === 4 ? year.slice(-2) : year;
        break;
      case LONG_YEAR_ABBR:
        result
          += year.length === 4
            ? year
            : year >= MAX_YEAR
              ? `19${year}`
              : `20${year}`;
        break;
      case MONTH_ABBR:
        result += month;
        break;
      case DAY_ABBR:
        result += day;
        break;
      default:
        throw new Error(`${toFormat[i]} is invalid format`);
    }

    if (i !== toFormat.length - 2) {
      result += toFormat[SEPARATOR_INDEX];
    }
  }

  return result;
}

module.exports = formatDate;
