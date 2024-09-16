'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldDate = date.split(fromFormat[3]);
  const newDate = [];

  let year = '';
  let month = '';
  let day = '';
  let oldYearFormat = '';
  let newYearFormat = '';

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i].includes('D')) {
      day = oldDate[i];
    }

    if (fromFormat[i].includes('M')) {
      month = oldDate[i];
    }

    if (fromFormat[i].includes('Y')) {
      year = oldDate[i];
      oldYearFormat = fromFormat[i];
    }
  }

  for (let k = 0; k < toFormat.length; k++) {
    if (toFormat[k].includes('D')) {
      newDate[k] = day;
    }

    if (toFormat[k].includes('M')) {
      newDate[k] = month;
    }

    if (toFormat[k].includes('Y')) {
      newYearFormat = toFormat[k];

      if (newYearFormat > oldYearFormat) {
        if (+year < 30) {
          year = '20' + year;
        } else {
          year = '19' + year;
        }
      }

      if (oldYearFormat > newYearFormat) {
        year = year.slice(2);
      }

      newDate[k] = year;
    }
  }

  return newDate.join(toFormat[3]);
}

module.exports = formatDate;
