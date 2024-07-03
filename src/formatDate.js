'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // find out which separator
  // to split the string
  // to convert to an array of numbers
  const fromSeparator = fromFormat[3];
  const oldFormat = date.split(fromSeparator);

  let year = '';
  let month = '';
  let day = '';

  // find out where the year, month and day
  // are in the old date format
  // assign appropriate values to the variables

  // don't take the separator (the last element of the fromFormat array)
  // for loop

  for (let i = 0; i < fromFormat.length - 1; i++) {
    switch (fromFormat[i]) {
      case 'YYYY':
      case 'YY':
        year = oldFormat[i];
        break;

      case 'DD':
        day = oldFormat[i];
        break;

      case 'MM':
        month = oldFormat[i];
        break;
    }
  }

  // create a new array from the array toFormat
  // replacing the strings 'YYYY'('YY'),'MM','DD'
  // the value of the variables year, month, day

  const newFormat = [];

  for (let i = 0; i < toFormat.length; i++) {
    switch (toFormat[i]) {
      case 'YYYY':
        newFormat[i] = year.length === 2 ? convertFormatYYtoYYYY() : year;
        break;

      case 'YY':
        newFormat[i] = year.length === 4 ? convertFormatYYYYtoYY() : year;
        break;

      case 'DD':
        newFormat[i] = day;
        break;

      case 'MM':
        newFormat[i] = month;
        break;
    }
  }

  function convertFormatYYYYtoYY() {
    // When converting from YYYY to YY just use 2 last digit (1997 -> 97)

    return year.slice(-2);
  }

  function convertFormatYYtoYYYY() {
    // When converting from YY to YYYY use 20YY if YY < 30 and 19YY otherwise

    // all two-digit years less than '30' belong to the 21st century
    // all others to the 20th century

    const LIMIT_21ST_CENTURY = 30;
    const INITIAL_DIGITS_YEARS_21ST_CENTURY = 20;
    const INITIAL_DIGITS_YEARS_20ST_CENTURY = 19;

    if (+year < LIMIT_21ST_CENTURY) {
      return INITIAL_DIGITS_YEARS_21ST_CENTURY + year;
    }

    return INITIAL_DIGITS_YEARS_20ST_CENTURY + year;
  }

  // convert the array into a string
  // using the separator- the last element of the toFormat array
  // and return this

  return newFormat.join(toFormat[3]);
}

module.exports = formatDate;
