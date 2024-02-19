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
  const fromMap = mapDate(fromFormat);
  const toMap = mapDate(toFormat);

  const fromDateArray = date.split(fromMap.separator);
  const toDateArray = Array(fromDateArray.length);

  const day = fromDateArray[fromMap.dayPos];
  const month = fromDateArray[fromMap.monthPos];
  const year = convertYear(fromDateArray[fromMap.yearPos], toMap.yearFormat);

  toDateArray[toMap.dayPos] = day;
  toDateArray[toMap.monthPos] = month;
  toDateArray[toMap.yearPos] = year;

  return toDateArray.join(toMap.separator);
}

function convertYear(year, numberOfDigits) {
  const CHANGING_CENTAURY_YEAR = 30;
  const XXI_CENTAURY_PREFIX = '20';
  const XX_CENTAURY_PREFIX = '19';

  if (numberOfDigits === year.length) {
    return year;
  }

  if (year.length > numberOfDigits) {
    return year.slice(year.length - numberOfDigits);
  }

  if (parseInt(year) < CHANGING_CENTAURY_YEAR) {
    return XXI_CENTAURY_PREFIX + year;
  }

  return XX_CENTAURY_PREFIX + year;
}

/*
   expected object from mapDate"
   {
    dayPos: day position in format,
    monthPos: month position in format,
    yearPos: year position in format,
    yearFormat: number of year digits
    separator: separator used in format
   }
  */

function mapDate(format) {
  const result = {};

  for (let i = 0; i < format.length; i++) {
    if (format[i].length < 1) {
      throw new Error('invalid format');
    }

    switch (format[i].charAt(0)) {
      case 'D': result.dayPos = i; break;
      case 'M': result.monthPos = i; break;
      case 'Y':
        result.yearPos = i;
        result.yearFormat = format[i].length;
        break;
      default: result.separator = format[i];
    }
  }

  return result;
}

module.exports = formatDate;
