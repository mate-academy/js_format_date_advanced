'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparetor = fromFormat[fromFormat.length - 1];
  const toSeparetor = toFormat[toFormat.length - 1];

  const dateParts = date.split(fromSeparetor);

  const dateList = {};

  for (let i = 0; i < dateParts.length; i++) {
    dateList[fromFormat[i]] = dateParts[i];
  }

  let year = dateList['YYYY'] || dateList['YY'];

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    year = year.slice(2);
  }

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    if (year < 30) {
      year = '20' + year;
    } else {
      year = '19' + year;
    }
  }

  dateList['YYYY'] = year;
  dateList['YY'] = year;

  const result = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    result.push(dateList[toFormat[i]]);
  }

  return result.join(toSeparetor);
}

module.exports = formatDate;
