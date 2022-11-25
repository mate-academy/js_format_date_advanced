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
  const oldSep = fromFormat[3];
  const newSep = toFormat[3];
  const oldDate = date.split(oldSep);

  let fromYearFirst = false;
  let toYearFirst = false;
  let fromYearLast = false;
  let toYearLast = false;

  const year = {
    from_2: false,
    from_4: false,
    to_2: false,
    to_4: false,
  };

  if (fromFormat[0].includes('Y')) {
    fromYearFirst = true;
    year[`from_${fromFormat[0].length}`] = true;
  } else {
    fromYearLast = true;
    year[`from_${fromFormat[2].length}`] = true;
  }

  if (toFormat[0].includes('Y')) {
    toYearFirst = true;
    year[`to_${toFormat[0].length}`] = true;
  } else {
    toYearLast = true;
    year[`to_${toFormat[2].length}`] = true;
  }

  let i = 0;
  let y = '';

  if (year.from_2) {
    i = fromFormat.indexOf('YY');
    y = (oldDate[i] < 30 ? '20' : '19') + oldDate[i];
  }

  if (year.from_4) {
    i = fromFormat.indexOf('YYYY');
    y = oldDate[i].slice(2);
  }

  if (fromFormat.indexOf('YYYY') === 1 && toYearLast) {
    oldDate.unshift(oldDate.pop());

    return oldDate.join(newSep);
  }

  if ((year.from_2 && year.to_4) || (year.from_4 && year.to_2)) {
    oldDate.splice(i, 1, y);

    if ((fromYearFirst && toYearFirst) || (fromYearLast && toYearLast)) {
      return oldDate.join(newSep);
    }

    return oldDate.reverse().join(newSep);
  }

  if ((fromYearFirst && toYearLast) || (fromYearLast && toYearFirst)) {
    return oldDate.reverse().join(newSep);
  }

  return oldDate.join(newSep);
}

module.exports = formatDate;
