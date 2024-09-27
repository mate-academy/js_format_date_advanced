'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldSeparator = fromFormat.pop();
  const newSeparator = toFormat.pop();
  const arrayDate = date.split(oldSeparator);
  const resultArr = [];
  let day, month, year;

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i].startsWith('Y')) {
      year = arrayDate[i];
    }

    if (fromFormat[i].startsWith('M')) {
      month = arrayDate[i];
    }

    if (fromFormat[i].startsWith('D')) {
      day = arrayDate[i];
    }
  }

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i].startsWith('Y')) {
      resultArr[i] = typeOfYear(year, toFormat[i]);
    }

    if (toFormat[i].startsWith('M')) {
      resultArr[i] = month;
    }

    if (toFormat[i].startsWith('D')) {
      resultArr[i] = day;
    }
  }

  return resultArr.join(newSeparator);
}

function typeOfYear(year, type) {
  if (year.length === type.length) {
    return year;
  }

  if (type === 'YY') {
    return year.slice(2);
  }

  if (type === 'YYYY' && year < 30) {
    return `20${year}`;
  }

  if (type === 'YYYY' && year >= 30) {
    return `19${year}`;
  }
}

module.exports = formatDate;
