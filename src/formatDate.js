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
  // Сonvert date into an array
  const dateParts = date.split(/\D+/);

  const newFormatDate = [];

  // Сreate a function to convert years
  function convertYear(year) {
    // Check for conversion of YYYY to YY or YY to YYYY
    if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
      // If conversion is from YYYY to YY,
      // return the last two digits of the year
      return year.slice(-2);
    } else if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
      // Calculating the century based on the year value
      // for YY to YYYY conversion
      if (year < 30) {
        return `20${year}`;
      } else if (year <= 99) {
        return `19${year}`;
      }
    }

    return year;
  }

  // Сreate an array for date conversion
  for (let i = 0; i < toFormat.length; i++) {
    const symbol = toFormat[i];

    let result = '';

    // Determine the index of the year part in the fromFormat array
    if (symbol === 'YYYY' || symbol === 'YY') {
      let yearIndex = '';

      if (fromFormat.indexOf('YYYY') !== -1) {
        yearIndex = fromFormat.indexOf('YYYY');
      } else {
        yearIndex = fromFormat.indexOf('YY');
      }

      const selectedYear = dateParts[yearIndex];

      // Convert the selected year based on the target format
      result = convertYear(selectedYear);
    } else if (symbol === 'MM') {
      // Retrieve the month part based on its index in fromFormat
      result = dateParts[fromFormat.indexOf('MM')];
    } else if (symbol === 'DD') {
      // Retrieve the day part based on its index in fromFormat
      result = dateParts[fromFormat.indexOf('DD')];
    }

    // Store the formatted result in the newFormatDate array
    if (i !== toFormat.length - 1) {
      newFormatDate.push(result);
    }
  }

  // Determine the delimiter based on the toFormat array
  let delimiter = '-';

  for (let i = 0; i < toFormat.length; i++) {
    if (!['YYYY', 'YY', 'MM', 'DD'].includes(toFormat[i])) {
      delimiter = toFormat[i];
      break;
    }
  }

  // Return the formatted date string
  return newFormatDate.join(delimiter);
}

module.exports = formatDate;
