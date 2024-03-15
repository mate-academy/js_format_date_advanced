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

function convertToFullYear(year) {
      if (year < 30) {
          return 20 + year;
        } else {
          return 19 + year
      }
}

function convertYearToShort(year) {
  return year % 100;
}


function formatDate(date, fromFormat, toFormat) {
  const idxSeparator = 3;
  const separatorFromFormat = fromFormat[idxSeparator];
  const separatorToFormat = toFormat[idxSeparator];
  const newDate = date.split(separatorFromFormat);
  const generalDate = [];

  const FORMATS = {
    DAY: 'DD',
    MONTH: 'MM',
    YYYY: 'YYYY',
    YY: 'YY'
  };
  //
  for (const item of toFormat) {
      if (item === FORMATS.DAY || item === FORMATS.MONTH) {
        const fromFormatIndex = fromFormat.indexOf(item);
        const toFormatIndex = toFormat.indexOf(item);

        generalDate[toFormatIndex] = newDate[fromFormatIndex];
      }

      if (item === FORMATS.YYYY) {
        const fromFormatIndex = fromFormat.indexOf(FORMATS.YYYY);
        const toFormatIndex = toFormat.indexOf(item);

        generalDate[toFormatIndex] = newDate[fromFormatIndex];
      }

      if (item === FORMATS.YYYY && fromFormat.includes(FORMATS.YY)) {
        const fromFormatIndex = fromFormat.indexOf(FORMATS.YY);
        const toFormatIndex = toFormat.indexOf(item);

        generalDate[toFormatIndex] = convertToFullYear(newDate[fromFormatIndex]);
      }

      if (item === FORMATS.YY) {
        const fromFormatIndex = fromFormat.indexOf(FORMATS.YYYY);
        const toFormatIndex = toFormat.indexOf(item);

        generalDate[toFormatIndex] = convertYearToShort (newDate[fromFormatIndex]);
      }
  }


  return generalDate.join(separatorToFormat);
}

  formatDate (
    '2020-02-18',
    ['YYYY', 'MM', 'DD', '-'],
    ['YYYY', 'MM', 'DD', '.'],
  ) // '2020.02.18'

  formatDate(
    '2020-02-18',
    ['YYYY', 'MM', 'DD', '-'],
    ['DD', 'MM', 'YYYY', '.'],
  ) // '18.02.2020'

  formatDate(
    '18-02-2020',
    ['DD', 'MM', 'YYYY', '-'],
    ['DD', 'MM', 'YY', '/'],
  ) // '18/02/20'

  formatDate(
    '20/02/18',
    ['YY', 'MM', 'DD', '/'],
    ['YYYY', 'MM', 'DD', '.'],
  ) // '2020.02.18'

  formatDate(
    '97/02/18',
    ['YY', 'MM', 'DD', '/'],
    ['DD', 'MM', 'YYYY', '.'],
  ) // '18.02.1997'
