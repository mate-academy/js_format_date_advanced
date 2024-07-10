'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat[3];
  const dateParts = date.split(fromSeparator);

  let yearPart = '';
  let monthPart = '';
  let dayPart = '';

  for (let i = 0; i < fromFormat.length - 1; i++) {
    switch (fromFormat[i]) {
      case 'YYYY':
      case 'YY':
        yearPart = dateParts[i];
        break;

      case 'DD':
        dayPart = dateParts[i];
        break;

      case 'MM':
        monthPart = dateParts[i];
        break;
    }
  }

  const newFormat = [];

  for (let i = 0; i < toFormat.length; i++) {
    switch (toFormat[i]) {
      case 'YYYY':
        newFormat[i] =
          yearPart.length === 2 ? convertFormatYYtoYYYY(yearPart) : yearPart;
        break;

      case 'YY':
        newFormat[i] =
          yearPart.length === 4 ? convertFormatYYYYtoYY(yearPart) : yearPart;
        break;

      case 'DD':
        newFormat[i] = dayPart;
        break;

      case 'MM':
        newFormat[i] = monthPart;
        break;
    }
  }

  function convertFormatYYYYtoYY(year) {
    return year.slice(-2);
  }

  function convertFormatYYtoYYYY(year) {
    const LIMIT_21ST_CENTURY = 30;
    const INITIAL_DIGITS_YEARS_21ST_CENTURY = '20';
    const INITIAL_DIGITS_YEARS_20TH_CENTURY = '19';

    if (+year < LIMIT_21ST_CENTURY) {
      return INITIAL_DIGITS_YEARS_21ST_CENTURY + year;
    }

    return INITIAL_DIGITS_YEARS_20TH_CENTURY + year;
  }

  return newFormat.join(toFormat[3]);
}

module.exports = formatDate;
