'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat[3];
  const toSeparator = toFormat[3];

  const splitDate = date.split(fromSeparator);

  const splitDateMap = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    splitDateMap[fromFormat[i]] = splitDate[i];
  }

  const fromYearKey = fromFormat.find((key) => key.includes('YY'));
  const toYearKey = toFormat.find((key) => key.includes('YY'));

  let year = fromYearKey ? splitDateMap[fromYearKey] : undefined;

  if (year && fromYearKey && toYearKey) {
    if (fromYearKey === 'YYYY' && toYearKey === 'YY') {
      year = year.slice(-2);
    }

    if (fromYearKey === 'YY' && toYearKey === 'YYYY') {
      const yearNum = Number(year);

      if (yearNum < 30) {
        year = '20' + year;
      } else {
        year = '19' + year;
      }
    }

    splitDateMap[toYearKey] = year;
  }

  const resultParts = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    resultParts.push(splitDateMap[toFormat[i]]);
  }

  return resultParts.join(toSeparator);
}

module.exports = formatDate;
