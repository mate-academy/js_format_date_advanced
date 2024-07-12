'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateParts = date.split(fromFormat[3]);
  const obj = {};
  const tab = [];
  let year;

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    fromFormat[fromFormat.indexOf('YY')] = 'YYYY';
    year = dateParts[fromFormat.indexOf('YYYY')];

    if (year < 30) {
      year = '20' + year;
    } else if (year >= 30) {
      year = '19' + year;
    }

    dateParts[fromFormat.indexOf('YYYY')] = year;
  }

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    fromFormat[fromFormat.indexOf('YYYY')] = 'YY';
    year = dateParts[fromFormat.indexOf('YY')].slice(2, 4);
    dateParts[fromFormat.indexOf('YY')] = year;
  }

  for (let i = 0; i < 3; i++) {
    obj[fromFormat[i]] = dateParts[i];
  }

  let k = 0;

  for (const name of toFormat) {
    tab[k] = obj[name];
    k++;

    if (k === 3) {
      break;
    }
  }

  return tab.join(toFormat[3]);
}

module.exports = formatDate;
