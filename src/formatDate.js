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
  function dateDestruct(targetDate, format) {
    const dateSeparated = date.split(fromFormat[3]);
    const res = {};

    for (const elem of fromFormat) {
      switch (true) {
        case elem === 'DD':
          res.DD = dateSeparated[fromFormat.indexOf(elem)];
          break;

        case elem === 'MM':
          res.MM = dateSeparated[fromFormat.indexOf(elem)];
          break;

        case elem.includes('YY'):
          res.YY = dateSeparated[fromFormat.indexOf(elem)];
      }
    };

    return res;
  };

  function dateReformat(format, dateData) {
    const newDate = [];

    for (const elem of toFormat) {
      switch (true) {
        case elem === 'DD':
          newDate.push(rawDate.DD);
          break;

        case elem === 'MM':
          newDate.push(rawDate.MM);
          break;

        case elem.includes('YY'):
          if (elem.length !== rawDate.YY.length) {
            rawDate.YY = yearFormat(rawDate.YY, elem);
          }
          newDate.push(rawDate.YY);
      }
    }

    return newDate.join(toFormat[3]);
  };

  function yearFormat(currentDate, targetFormat) {
    if (currentDate.length > targetFormat.length) {
      return currentDate.slice(2);
    } else if (currentDate < 30) {
      return '20' + currentDate;
    }

    return '19' + currentDate;
  }

  const rawDate = dateDestruct(date, fromFormat);

  return dateReformat(toFormat, rawDate);
}

module.exports = formatDate;
