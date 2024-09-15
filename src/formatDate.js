'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const reversedFromFormat = [...fromFormat].reverse();
  const [separator, ...oldFormat] = reversedFromFormat;
  const newSeparator = toFormat[toFormat.length - 1];
  const arrayDate = date.split(separator).reverse();
  let year = '';
  const oldFormatDate = {};
  let result = '';

  for (let index = 0; index < oldFormat.length; index++) {
    if (oldFormat[index].includes('Y')) {
      year = arrayDate[index];
    }

    oldFormatDate[oldFormat[index]] = arrayDate[index];
  }

  for (let index = 0; index < toFormat.length - 1; index++) {
    if (toFormat[index].includes('Y')) {
      const newYear = convertYear(toFormat[index], year);

      result += newYear;
    } else {
      const partDate = oldFormatDate[toFormat[index]];

      result += partDate;
    }

    if (index !== toFormat.length - 2) {
      result += newSeparator;
    }
  }

  return result;
}

function convertYear(newFormat, year) {
  if (year.length === newFormat.length) {
    return year;
  }

  if (newFormat.length === 2) {
    return year.slice(2);
  }

  if (year < 30) {
    return `20${year}`;
  }

  return `19${year}`;
}

module.exports = formatDate;
