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
  const separatorFormats = [];
  const yearFormats = [];

  getFormat(fromFormat, yearFormats, separatorFormats);
  getFormat(toFormat, yearFormats, separatorFormats);

  const oldFormat = date.split(separatorFormats[0]);
  const result = [];
  let yearIndex;

  for (let i = 0; i < 3; i++) {
    let oldIndex;

    if (toFormat[i].includes('Y')) {
      oldIndex = searchFormatItem('Y', fromFormat);
      result[i] = oldFormat[oldIndex];
      yearIndex = i;
    } else if (toFormat[i].includes('M')) {
      oldIndex = searchFormatItem('M', fromFormat);
      result[i] = oldFormat[oldIndex];
    } else if (toFormat[i].includes('D')) {
      oldIndex = searchFormatItem('D', fromFormat);
      result[i] = oldFormat[oldIndex];
    }
  }

  if (yearFormats[0].length === yearFormats[1].length) {
    return result.join(separatorFormats[1]);
  } else if (yearFormats[0].length > yearFormats[1].length) {
    result[yearIndex] = result[yearIndex].slice(-2);
  } else {
    let year = result[yearIndex].slice(-2);

    year = year < 30 ? '20' + year : '19' + year;
    result[yearIndex] = year;
  }

  return result.join(separatorFormats[1]);
}

function getFormat(format, yearFormats, separatorFormats) {
  for (const item of format) {
    switch (item[0]) {
      case 'Y':
        yearFormats.push(item);
        break;

      case 'M':
      case 'D':
        break;

      default:
        separatorFormats.push(item);
    }
  }
}

function searchFormatItem(key, format) {
  for (let i = 0; i < 3; i++) {
    if (format[i].includes(key)) {
      return i;
    }
  }
}

module.exports = formatDate;
