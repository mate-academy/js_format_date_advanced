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
  const toSeparator = toFormat[3];

  const fromDateObject = {};
  const toDateArray = [];

  const dateArray = date.split(fromSeparator);

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i] === 'YY') {
      fromDateObject['YYYY'] = convertYY(dateArray[i]);
    } else {
      fromDateObject[fromFormat[i]] = dateArray[i];
    }
  }

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (toFormat[i] === 'YY') {
      toDateArray.push(fromDateObject.YYYY.slice(2));
    } else {
      toDateArray.push(fromDateObject[toFormat[i]]);
    }
  }

  return toDateArray.join(toSeparator);
}

// Function to convert YY to YYYY format:

function convertYY(year) {
  if (year < 30) {
    return '20' + year;
  } else {
    return '19' + year;
  }
}

module.exports = formatDate;
