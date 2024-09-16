'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // write code here

  const dateArray = date.split(fromFormat[3]);

  const nowDate = {};

  const separator = toFormat[3];

  let inputYearLength;

  const outputArray = [];

  for (let i = 0; i < 3; i++) {
    switch (fromFormat[i][0]) {
      case 'D':
        nowDate.day = dateArray[i];
        break;

      case 'M':
        nowDate.month = dateArray[i];
        break;

      case 'Y':
        nowDate.year = dateArray[i];
        inputYearLength = fromFormat[i].length;
        break;
    }
  }

  for (let i = 0; i < 3; i++) {
    switch (toFormat[i][0]) {
      case 'D':
        outputArray.push(nowDate.day);
        break;

      case 'M':
        outputArray.push(nowDate.month);
        break;

      case 'Y':
        outputArray.push(
          getYear(nowDate.year, inputYearLength, toFormat[i].length)
        );

        break;
    }
  }

  return outputArray.join(separator);

  function getYear(year, inputLength, outputLength) {
    if (inputLength > outputLength) {
      return year.slice(2);
    } else if (inputLength < outputLength) {
      if (year >= 30) {
        return `19${year}`;
      } else {
        return `20${year}`;
      }
    }

    return year;
  }
}

module.exports = formatDate;
