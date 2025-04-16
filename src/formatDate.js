'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldFormat = fromFormat.slice(0, 3);
  const oldSeparator = fromFormat[3];
  const newFormat = toFormat.slice(0, 3);
  const newSeparator = toFormat[3];

  const days = date.split(oldSeparator);

  let dd, mm, yy, yyyy;

  for (let i = 0; i < oldFormat.length; i++) {
    switch (oldFormat[i]) {
      case 'DD':
        dd = days[i];
        break;
      case 'MM':
        mm = days[i];
        break;
      case 'YY':
        yy = days[i];
        break;
      case 'YYYY':
        yyyy = days[i];
        break;
    }
  }

  if (yyyy === undefined) {
    if (+yy < 30) {
      yyyy = '20' + yy;
    } else {
      yyyy = '19' + yy;
    }
  }

  if (yy === undefined) {
    yy = yyyy.slice(2);
  }

  const result = [];

  for (let i = 0; i < newFormat.length; i++) {
    switch (newFormat[i]) {
      case 'DD':
        result[i] = dd;
        break;
      case 'MM':
        result[i] = mm;
        break;
      case 'YY':
        result[i] = yy;
        break;
      case 'YYYY':
        result[i] = yyyy;
        break;
    }
  }

  return result.join(newSeparator);
}

module.exports = formatDate;
