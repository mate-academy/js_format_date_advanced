'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateMass = date.split(fromFormat[3]);

  let day = 0;
  let month = 0;
  let year = 0;

  let fromYearFormat = '';
  let toYearFormat = '';
  const formatedDate = [];

  for (let i = 0; i <= 2; i++) {
    if (fromFormat[i] === 'YY' || fromFormat[i] === 'YYYY') {
      year = dateMass[i];
      year = Number(year);
      fromYearFormat = fromFormat[i];
    }

    if (fromFormat[i] === 'MM') {
      month = dateMass[i];
    }

    if (fromFormat[i] === 'DD') {
      day = dateMass[i];
    }
  }

  for (const format of toFormat) {
    if (format === 'YY' || format === 'YYYY') {
      toYearFormat = format;
    }
  }

  if (fromYearFormat !== toYearFormat) {
    if (fromYearFormat === 'YY' && toYearFormat === 'YYYY') {
      if (year < 30) {
        year += 2000;
      } else {
        year += 1900;
      }
    }

    if (fromYearFormat === 'YYYY' && toYearFormat === 'YY') {
      year = year % 100;
    }
  }

  for (let i = 0; i <= 2; i++) {
    if (toFormat[i] === 'YY' || toFormat[i] === 'YYYY') {
      formatedDate.push(year);
    }

    if (toFormat[i] === 'MM') {
      formatedDate.push(month);
    }

    if (toFormat[i] === 'DD') {
      formatedDate.push(day);
    }
  }

  return formatedDate.join(toFormat[3]);
}

module.exports = formatDate;
