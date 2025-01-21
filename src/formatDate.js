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

  const dateArr = date.split(fromFormat[fromFormat.length - 1]);

  // console.log(dateArr);

  const dateObj = {};
  let result = '';
  // const joinchar = toFormat[toFormat.length - 1];
  let fromYCount = 0;
  let toYCount = 0;
  let year = '';

  for (let d = 0; d < dateArr.length; d++) {
    dateObj[fromFormat[d]] = dateArr[d];

    if (fromFormat[d].includes('Y')) {
      fromYCount = fromFormat[d].length;
    }
  }

  // console.log(dateObj);

  for (let d = 0; d < toFormat.length - 1; d++) {
    if (toFormat[d].includes('Y')) {
      toYCount = toFormat[d].length;
      year = dateObj['Y'.repeat(fromYCount)];
      // console.log(year);

      if (toYCount === 2 && fromYCount === 4) {
        result += year.slice(2);
      } else if (toYCount === 4 && fromYCount === 2) {
        if (year < 30) {
          result += '20' + year;
        } else if (year >= 30) {
          result += '19' + year;
        }
      } else {
        result += year;
      }
    } else {
      result += dateObj[toFormat[d]];
    }

    if (d !== toFormat.length - 2) {
      result += toFormat[toFormat.length - 1];
    }
  }

  return result;
}

module.exports = formatDate;
