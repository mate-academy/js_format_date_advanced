'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  let year;
  let month;
  let day;
  let toDate = [];
  let separator = ' ';
  let newSeparator = ' ';

  for (let i = 0; i < date.length; i++) {
    if (isNaN(date[i])) {
      separator = date[i];
    }
  }

  if (toFormat.length > 3) {
    for (let j = 0; j < fromFormat.length; j++) {
      if (
        !toFormat[j].includes('Y') &&
        !toFormat[j].includes('M') &&
        !toFormat[j].includes('D')
      ) {
        newSeparator = toFormat[j];
      }
    }
  }

  const newDate = date.split(separator);

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i].includes('Y')) {
      year = newDate[i];
    }

    if (fromFormat[i].includes('M')) {
      month = newDate[i];
    }

    if (fromFormat[i].includes('D')) {
      day = newDate[i];
    }
  }

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i].includes('Y')) {
      if (toFormat[i].length === year.length) {
        toDate[i] = year;
      }

      if (toFormat[i].length > year.length) {
        if (year < 30) {
          toDate[i] = 20 + year;
        } else {
          toDate[i] = 19 + year;
        }
      }

      if (toFormat[i].length < year.length) {
        toDate[i] = year.slice(2);
      }
    }

    if (toFormat[i].includes('M')) {
      toDate[i] = month;
    }

    if (toFormat[i].includes('D')) {
      toDate[i] = day;
    }
  }

  toDate = toDate.join(newSeparator);

  return toDate;
}

module.exports = formatDate;
