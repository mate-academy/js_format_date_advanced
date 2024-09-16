'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateArray = date.split(fromFormat[3]);
  const newSeparator = toFormat[3];
  const result = [];

  let day, month, year;

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i].includes('Y')) {
      year = dateArray[i];
    }

    if (fromFormat[i].includes('M')) {
      month = dateArray[i];
    }

    if (fromFormat[i].includes('D')) {
      day = dateArray[i];
    }
  }

  for (let j = 0; j < toFormat.length; j++) {
    if (toFormat[j] === 'DD') {
      result.push(day);
    }

    if (toFormat[j] === 'MM') {
      result.push(month);
    }

    if (toFormat[j].includes('Y')) {
      if (toFormat[j].length === year.length) {
        result.push(year);
      }

      if (toFormat[j].length < year.length) {
        result.push(year.slice(-2));
      }

      if (toFormat[j].length > year.length && year < 30) {
        result.push(20 + year);
      }

      if (toFormat[j].length > year.length && year >= 30) {
        result.push(19 + year);
      }
    }
  }

  return result.join(newSeparator);
}

module.exports = formatDate;
