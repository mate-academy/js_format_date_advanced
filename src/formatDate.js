'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const SEPARATOR_OLD = fromFormat[fromFormat.length - 1];
  const SEPARATOR_NEW = toFormat[toFormat.length - 1];

  const dateOldFormat = date.split(SEPARATOR_OLD);
  const dateNewFormat = [];
  const dateObj = {};

  for (let i = 0; i < dateOldFormat.length; i++) {
    dateObj[fromFormat[i]] = [dateOldFormat[i]];
  }

  for (let i = 0; i < toFormat.length; i++) {
    if (dateObj[toFormat[i]]) {
      dateNewFormat.push(dateObj[toFormat[i]]);
    }

    if (toFormat[i] === 'YY' && dateObj['YYYY']) {
      dateNewFormat.push(dateObj['YYYY'].join().slice(2));
    } else if (toFormat[i] === 'YYYY' && dateObj['YY']) {
      const year =
        dateObj['YY'] < 30 ? '20' + dateObj['YY'] : '19' + dateObj['YY'];

      dateNewFormat.push(year);
    }
  }

  const dateNew = dateNewFormat.join(SEPARATOR_NEW);

  return dateNew;
}

module.exports = formatDate;
