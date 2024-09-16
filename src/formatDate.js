'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const splitDate = date.split(/[-,/,.]/);
  const separator = toFormat[3];
  let newDate = '';
  let day = '';
  let year = '';
  let month = '';

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i] === 'DD') {
      day = splitDate[i];
    }

    if (fromFormat[i] === 'YYYY') {
      year = splitDate[i];
    }

    if (fromFormat[i] === 'YY' && splitDate[i] < 30) {
      year = `20${splitDate[i]}`;
    } else if (fromFormat[i] === 'YY' && splitDate[i] >= 30) {
      year = `19${splitDate[i]}`;
    }

    if (fromFormat[i] === 'MM') {
      month = splitDate[i];
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'YYYY') {
      newDate += `${year}${separator}`;
    } else if (toFormat[i] === 'YYYY') {
      newDate += `${year}${separator}`;
    }

    if (toFormat[i] === 'YY' && fromFormat[i] === 'YYYY') {
      newDate += `${year.slice(2, 4)}${separator}`;
    }

    if (toFormat[i] === 'DD') {
      newDate += `${day}${separator}`;
    }

    if (toFormat[i] === 'MM') {
      newDate += `${month}${separator}`;
    }
  }

  return newDate.slice(0, -1);
}

module.exports = formatDate;
