'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateArr = date.split(fromFormat[fromFormat.length - 1]);
  const dateObject = {};
  let yearFormatKey = '';

  for (let i = 0; i < fromFormat.length - 1; i++) {
    dateObject[fromFormat[i]] = dateArr[i];

    if (fromFormat[i].includes('Y')) {
      yearFormatKey = fromFormat[i];
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    dateArr[i] = dateObject[toFormat[i]] || formYear(dateObject[yearFormatKey]);
  }

  return dateArr.join(toFormat[toFormat.length - 1]);
}

function formYear(year) {
  let result = +year;

  switch (year.length) {
    case 2:
      result = result < 30 ? result + 2000 : result + 1900;
      break;
    case 4 :
      result %= 100;
  }

  return result.toString();
}

module.exports = formatDate;
