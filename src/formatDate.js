'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  let newFormat = '';
  const fromSeparator = fromFormat[fromFormat.length - 1];
  const toSeparator = toFormat[toFormat.length - 1];

  let year = '';
  let month = '';
  let day = '';

  let count = 0;

  for (let i = 0; i < fromFormat.length - 1; i++) {
    switch (fromFormat[i]) {
      case 'YY':
        year = date.slice(count, count + fromFormat[i].length);

        if (+year < 30) {
          year = '20' + year;
        } else {
          year = '19' + year;
        }
        break;

      case 'YYYY':
        year = date.slice(count, count + fromFormat[i].length);
        break;

      case 'DD':
        day = date.slice(count, count + fromFormat[i].length);
        break;

      case 'MM':
        month = date.slice(count, count + fromFormat[i].length);
        break;
    }
    count += fromFormat[i].length + fromSeparator.length;
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    switch (toFormat[i]) {
      case 'YY':
        newFormat += year.slice(2);
        break;

      case 'YYYY':
        newFormat += year;
        break;

      case 'DD':
        newFormat += day;
        break;

      case 'MM':
        newFormat += month;
        break;
    }

    if (i < toFormat.length - 2) {
      newFormat += toSeparator;
    }
  }

  return newFormat;
}

module.exports = formatDate;
