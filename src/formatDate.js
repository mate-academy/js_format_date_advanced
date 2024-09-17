'use strict';

/**
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
