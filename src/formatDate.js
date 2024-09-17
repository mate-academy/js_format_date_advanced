'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateRes = date.split(fromFormat[3]);
  const result = [];

  let year = 0;
  let month = 0;
  let day = 0;

  for (let i = 0; i < 3; i++) {
    switch (fromFormat[i]) {
      case 'YY':
      case 'YYYY':
        year = i;
        break;

      case 'MM':
        month = i;
        break;

      case 'DD':
        day = i;
        break;
    }
  }

  const yearFormat = (dateRes[year] > 24 ? '19' : '20');
  const yearCalc = (
    dateRes[year].length > 2
      ? dateRes[year]
      : yearFormat + dateRes[year]
  );

  for (let i = 0; i < 3; i++) {
    switch (toFormat[i]) {
      case 'YY':
        result.push(dateRes[year].slice(-2));
        break;

      case 'YYYY':
        result.push(yearCalc);
        break;

      case 'MM':
        result.push(dateRes[month]);
        break;

      case 'DD':
        result.push(dateRes[day]);
        break;
    }
  }

  return result.join(toFormat[3]);
}

module.exports = formatDate;
