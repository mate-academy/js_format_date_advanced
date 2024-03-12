"use strict";

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
  const separatorFrom = fromFormat[3];
  const separatorNew = toFormat[3];
  const longFormatYear = "YYYY";
  const shortFormatYear = "YY";
  const dateFormat = "DD";
  const monthFormat = "MM";
  const dateArray = date.split(separatorFrom);
  const newDateArray = [];
  const objDateFrom = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    objDateFrom[fromFormat[i]] = dateArray[i];
  }

  for (const partOfDate of toFormat) {
    switch (partOfDate) {
      case dateFormat:
        newDateArray.push(objDateFrom[dateFormat]);
        break;

      case monthFormat:
        newDateArray.push(objDateFrom[monthFormat]);
        break;

      case longFormatYear:
        if (objDateFrom[longFormatYear]) {
          newDateArray.push(objDateFrom[longFormatYear]);
        } else {
          const longYear = mapShortToLong(objDateFrom[shortFormatYear]);

          newDateArray.push(longYear);
        }
        break;

      case shortFormatYear:
        if (objDateFrom[shortFormatYear]) {
          newDateArray.push(objDateFrom[shortFormatYear]);
        } else {
          const shortYear = mapLongToShort(objDateFrom[longFormatYear]);

          newDateArray.push(shortYear);
        }
        break;
    }
  }

  return newDateArray.join(separatorNew);
}

const mapLongToShort = (year) => {
  return year.slice(2);
};

const mapShortToLong = (year) => {
  if (+year < 30) {
    return `20${year}`;
  } else {
    return `19${year}`;
  }
};

module.exports = formatDate;
