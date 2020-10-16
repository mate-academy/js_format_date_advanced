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
  // write code here

  const signFromFormat = fromFormat.slice(-1);
  const signtoFormat = toFormat.slice(-1);

  if (fromFormat.join() === ['YYYY', 'MM', 'DD', '-'].join()
    && toFormat.join() === ['YYYY', 'MM', 'DD', '.'].join()) {
    return date.split(signFromFormat).join(signtoFormat);
  }

  if (fromFormat.join() === ['YYYY', 'MM', 'DD', '-'].join()
    && toFormat.join() === ['DD', 'MM', 'YY', '/'].join()) {
    return date.split(signFromFormat).join(signtoFormat);
  }

  if (fromFormat.join() === ['YYYY', 'MM', 'DD', '-'].join()
    && toFormat.join() === ['DD', 'MM', 'YYYY', '-'].join()) {
    return date.split(signFromFormat).reverse().join(signtoFormat);
  }

  if (fromFormat.join() === ['MM', 'DD', 'YYYY', '/'].join()
    && toFormat.join() === ['MM', 'DD', 'YY', '/'].join()) {
    const datas = date.split(signFromFormat).splice(2, 1).join('').split('');
    const date1 = date.split(signFromFormat);

    date1.splice(2, 1, datas.slice(-2).join(''));

    return date1.join(signtoFormat);
  }

  if (fromFormat.slice(0, -1).join() === ['YY', 'MM', 'DD'].join()
    && toFormat.slice(0, -1).join() === ['YYYY', 'MM', 'DD'].join()) {
    const datas = date.split(signFromFormat).splice(0, 1).join('');
    const date1 = date.split(signFromFormat);

    if (+datas < 30) {
      date1.splice(0, 1, `20${datas}`);
    } else {
      date1.splice(0, 1, `19${datas}`);
    }

    return date1.join(signtoFormat);
  }
};

module.exports = formatDate;
