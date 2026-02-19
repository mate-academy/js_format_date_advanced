'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separatorFrom = fromFormat[3];
  const separatorTo = toFormat[3];

  const parts = date.split(separatorFrom);

  const map = {};

  for (let i = 0; i < 3; i++) {
    map[fromFormat[i]] = parts[i];
  }

  let year = map['YYYY'] || map['YY'];

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    year = year.slice(-2);
  } else if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    const yy = parseInt(year, 10);

    if (yy < 30) {
      year = '20' + yy.toString().padStart(2, '0');
    } else {
      year = '19' + yy;
    }
  }

  map['YYYY'] = year;
  map['YY'] = year.slice(-2);

  const resultParts = [];

  for (let j = 0; j < 3; j++) {
    resultParts.push(map[toFormat[j]]);
  }

  return resultParts.join(separatorTo);
}

module.exports = formatDate;
