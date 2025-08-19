'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const splitTime = date.split(fromFormat[3]);

  let day;
  let month;
  let year;
  const modifiedTime = [];

  for (let i = 0; i < 3; i++) {
    if (fromFormat[i].includes('Y')) {
      year = splitTime[i];
    }

    if (fromFormat[i].includes('M')) {
      month = splitTime[i];
    }

    if (fromFormat[i].includes('D')) {
      day = splitTime[i];
    }
  }

  for (let i = 0; i < 3; i++) {
    if (toFormat[i].includes('Y')) {
      if (year.length === toFormat[i].length) {
        modifiedTime.push(year);
      }

      if (year.length > toFormat[i].length) {
        modifiedTime.push(year.slice(-2));
      }

      if (year.length < toFormat[i].length) {
        if (year >= 30) {
          modifiedTime.push('19' + year);
        } else {
          modifiedTime.push('20' + year);
        }
      }
    }

    if (toFormat[i].includes('M')) {
      modifiedTime.push(month);
    }

    if (toFormat[i].includes('D')) {
      modifiedTime.push(day);
    }
  }

  return modifiedTime.join(toFormat[3]);
}

module.exports = formatDate;
