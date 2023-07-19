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
  const dateLiterals = {
    YEAR: 'YYYY',
    YEAR_SHORT: 'YY',
    DAY: 'DD',
    MONTH: 'MM',
  };
  const CURRENT_CENTURY = 20;
  const CURRENT_MAX_YEAR = 30;

  const getYear = (inputYear) => {
    const yearObj = {
      short: '',
      long: '',
    };

    if (inputYear.length < 4) {
      yearObj.short = inputYear;

      if (+inputYear < CURRENT_MAX_YEAR) {
        yearObj.long += CURRENT_CENTURY + inputYear;
      } else {
        yearObj.long += (CURRENT_CENTURY - 1) + inputYear;
      }
    } else {
      yearObj.long += inputYear;

      yearObj.short += Array.from(inputYear).slice(-2).join('');
    }

    return yearObj;
  };

  const inputFormat = fromFormat.slice(0, 3);
  const inputSeparator = fromFormat[3];
  const inputDate = date.split(inputSeparator);

  const outputFormat = toFormat.slice(0, 3);
  const outputSeparator = toFormat[3];
  const outputDate = [];

  const dateObj = {
    year: null,
    month: null,
    day: null,
  };

  for (let i = 0; i < inputFormat.length; i++) {
    switch (inputFormat[i]) {
      case dateLiterals.YEAR:
        dateObj.year = getYear(inputDate[i]);
        break;
      case dateLiterals.YEAR_SHORT:
        dateObj.year = getYear(inputDate[i]);
        break;
      case dateLiterals.MONTH:
        dateObj.month = inputDate[i];
        break;
      case dateLiterals.DAY:
        dateObj.day = inputDate[i];
        break;
    }
  }

  for (let i = 0; i < outputFormat.length; i++) {
    switch (outputFormat[i]) {
      case dateLiterals.YEAR:
        outputDate[i] = dateObj.year.long;
        break;
      case dateLiterals.YEAR_SHORT:
        outputDate[i] = dateObj.year.short;
        break;
      case dateLiterals.MONTH:
        outputDate[i] = dateObj.month;
        break;
      case dateLiterals.DAY:
        outputDate[i] = dateObj.day;
        break;
    }
  }

  return outputDate.join(outputSeparator);
}

module.exports = formatDate;
