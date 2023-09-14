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
  const OLD_SEPARATOR = fromFormat[3];
  const NEW_SEPARATOR = toFormat[3];
  const DAY_FORMAT = 'DD';
  const MONTH_FORMAT = 'MM';
  const YEAR_SHORT_FORMAT = 'YY';
  const YEAR_LONG_FORMAT = 'YYYY';

  const oldData = date.split(OLD_SEPARATOR);
  const data = {
    dd: 0,
    mm: 0,
    year: 0,
  };

  for (let i = 0; i < oldData.length; i++) {
    if (fromFormat[i] === YEAR_LONG_FORMAT
      || fromFormat[i] === YEAR_SHORT_FORMAT) {
      data.year = oldData[i];
    }

    if (fromFormat[i] === DAY_FORMAT) {
      data.dd = oldData[i];
    }

    if (fromFormat[i] === MONTH_FORMAT) {
      data.mm = oldData[i];
    }
  }

  const result = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === DAY_FORMAT) {
      result.push(data.dd);
    } else if (toFormat[i] === MONTH_FORMAT) {
      result.push(data.mm);
    } else if (toFormat[i] === YEAR_LONG_FORMAT
    && data.year.length === 2) {
      if (data.year < 30) {
        result.push(`20${data.year}`);
      } else {
        result.push(`19${data.year}`);
      }
    } else if (toFormat[i] === YEAR_SHORT_FORMAT
    && data.year.length === 4) {
      result.push((data.year).slice(2));
    } else if (toFormat[i] === YEAR_SHORT_FORMAT
    && data.year.length === 2) {
      result.push(data.year);
    } else if (toFormat[i] === YEAR_LONG_FORMAT
    && data.year.length === 4) {
      result.push(data.year);
    }
  }

  return result.join(NEW_SEPARATOR);
}

module.exports = formatDate;
