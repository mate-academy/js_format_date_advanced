'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separator = fromFormat[3];
  const newSeparator = toFormat[3];
  const dateArray = date.split(separator);
  let day;
  let month;
  let year;
  let formatYear;
  const newDate = [...toFormat];

  newDate.pop();

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i] === 'DD') {
      day = dateArray[i];
    }

    if (fromFormat[i] === 'MM') {
      month = dateArray[i];
    }

    if (fromFormat[i] === 'YY' || fromFormat[i] === 'YYYY') {
      year = dateArray[i];
      formatYear = fromFormat[i];
    }
  }

  if (!toFormat.includes(formatYear)) {
    if (year.length === 2) {
      if (year < 30) {
        year = '20' + year;
      } else {
        year = '19' + year;
      }
    } else {
      year = year.slice(-2);
    }
  }

  for (let i = 0; i < newDate.length; i++) {
    if (newDate[i] === 'DD') {
      newDate[i] = day;
    }

    if (newDate[i] === 'MM') {
      newDate[i] = month;
    }

    if (newDate[i] === 'YYYY' || newDate[i] === 'YY') {
      newDate[i] = year;
    }
  }

  return newDate.join(newSeparator);
}

module.exports = formatDate;
