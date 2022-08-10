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
  const oldSeparator = fromFormat[3];
  const newSeparator = toFormat[3];
  let oldYearFormat;
  let newYearFormat;

  const formatedDate = {
    y: null,
    d: null,
    m: null,
  };

  const dateArr = date.split(oldSeparator);

  for (const i in formatedDate) {
    for (const j in fromFormat) {
      if (fromFormat[j].toLowerCase().includes(i)) {
        formatedDate[i] = dateArr[j];

        if (i === 'y') {
          oldYearFormat = fromFormat[j].length;
        }
        break;
      }
    }
  }

  for (const i in toFormat) {
    for (const j in formatedDate) {
      if (toFormat[i].toLowerCase().includes(j)) {
        if (j === 'y') {
          newYearFormat = toFormat[i].length;

          if (oldYearFormat < newYearFormat) {
            if (formatedDate.y < 30) {
              dateArr[i] = '20' + formatedDate.y;
              break;
            } else if (formatedDate.y >= 30) {
              dateArr[i] = '19' + formatedDate.y;
              break;
            }
          } else if (oldYearFormat > newYearFormat) {
            dateArr[i] = formatedDate.y.slice(2);
            break;
          } else {
            dateArr[i] = formatedDate.y;
            break;
          }
        }

        dateArr[i] = formatedDate[j];
        break;
      }
    }
  }

  return dateArr.join(newSeparator);
}

module.exports = formatDate;
