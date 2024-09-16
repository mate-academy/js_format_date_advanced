'use strict';

/**
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
