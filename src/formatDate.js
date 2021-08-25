'use strict';

/**
 *   Time flies, standards change. Let's get rid of the routine of changing the
 * date format. Create a `formatDate` function that accepts the `date` string,
 * the old `fromFormat` array and the new `toFormat` array. Function returns
 * given date in new format.
 *   The function can change a separator, reorder the date parts of convert a
 * year from 4 digits to 2 digits and back.
 *  c
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
  const newSeparator = toFormat.pop();
  const oldSeparator = fromFormat.pop();
  const oldVersionDate = date.split(oldSeparator);
  const format = {
    DD: '',
    MM: '',
    YY: '',
    YYYY: '',
  };

  for (let i = 0; i < fromFormat.length; i++) {
    switch (fromFormat[i]) {
      case 'DD':
        format['DD'] = oldVersionDate[i];
        break;

      case 'MM':
        format['MM'] = oldVersionDate[i];
        break;

      case 'YY':
        format['YY'] = oldVersionDate[i];

        const formatYYYY = oldVersionDate[i] < 30
          ? `20${oldVersionDate[i]}`
          : `19${oldVersionDate[i]}`;

        format['YYYY'] = formatYYYY;
        break;

      case 'YYYY':
        format['YYYY'] = oldVersionDate[i];
        format['YY'] = oldVersionDate[i].slice(2);
        break;
    }
  };

  const newVersionDate = toFormat.map(el => format[el]);

  return newVersionDate.join(newSeparator);
}

module.exports = formatDate;
