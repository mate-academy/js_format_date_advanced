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

  const ifFromIncludesYY = fromFormat.includes('YY');
  const ifFromIncludesYYYY = fromFormat.includes('YYYY');
  const ifToIncludesYY = toFormat.includes('YY');
  const ifToIncludesYYYY = toFormat.includes('YYYY');

  const fromIndexYY = fromFormat.indexOf('YY');
  const fromIndexYYYY = fromFormat.indexOf('YYYY');

  if (ifFromIncludesYY && ifToIncludesYYYY) {
    fromFormat[fromIndexYY] = 'YYYY';

    const yearYYYY = fromFormat.indexOf('YYYY');

    year = dateParts[yearYYYY];

    if (year < 30) {
      year = '20' + year;
    } else if (year >= 30) {
      year = '19' + year;
    }

    dateParts[yearYYYY] = year;
  }

  if (ifFromIncludesYYYY && ifToIncludesYY) {
    fromFormat[fromIndexYYYY] = 'YY';

    const yearYY = fromFormat.indexOf('YY');

    year = dateParts[yearYY].slice(2, 4);
    dateParts[yearYY] = year;
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
