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
  const pastSeparator = fromFormat[3];
  const oldFormat = date.split(pastSeparator);

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
        year += oldFormat[i];
        break;

      case 'DD':
        day += oldFormat[i];
        break;

      case 'MM':
        month += oldFormat[i];
        break;
    }
  }

  // create a new array from the array toFormat
  // replacing the strings 'YYYY'('YY'),'MM','DD'
  // the value of the variables year, month, day

  const newFormat = [];

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i] === 'YYYY') {
      // When converting from YY to YYYY use 20YY if YY < 30 and 19YY otherwise

      if (year.length === 2) {
        if (+year < 30) {
          year = '20' + year;
        } else {
          year = '19' + year;
        }
      }

      newFormat[i] = year;
    }

    // When converting from YYYY to YY just use 2 last digit (1997 -> 97)

    if (toFormat[i] === 'YY') {
      if (year.length === 4) {
        year = year.slice(-2);
      }

      newFormat[i] = year;
    }

    if (toFormat[i] === 'MM') {
      newFormat[i] = month;
    }

    if (toFormat[i] === 'DD') {
      newFormat[i] = day;
    }
  }

  // convert the array into a string
  // using the separator- the last element of the toFormat array
  // and return this

  return newFormat.join(toFormat[3]);
}

module.exports = formatDate;
