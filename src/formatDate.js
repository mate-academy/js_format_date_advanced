'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const split = fromFormat[3];
  const dayOfYear = date.split(split);
  const tab = [];

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (fromFormat[i] === toFormat[j]) {
        tab[j] = dayOfYear[i];
      }
    }
  }

  let year;

  for (let i = 0; i < 3; i++) {
    if (fromFormat[i] === 'YYYY' || fromFormat[i] === 'YY') {
      year = dayOfYear[i];
    }
  }

  if (year.length === 2 && year < 30) {
    year = '20' + year;
  }

  if (year.length === 2 && year >= 30) {
    year = '19' + year;
  }

  for (let i = 0; i < 3; i++) {
    if (toFormat[i] === 'YY' && year.length === 4) {
      year = year.slice(2, 4);
    }
  }

  for (let i = 0; i < 3; i++) {
    if (tab[i] === undefined) {
      tab[i] = year;
    }
  }

  return tab.join(toFormat[3]);
}

module.exports = formatDate;
