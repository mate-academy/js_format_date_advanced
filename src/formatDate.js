'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  let day = '';
  let month = '';
  let year = '';
  const dateString = date.split(fromFormat[3]);
  const resultDate = [];

  for (let i = 0; i < dateString.length; i++) {
    if (fromFormat[i] === 'YYYY') {
      year = dateString[i];
    }

    if (fromFormat[i] === 'YY') {
      year = dateString[i];
    }

    if (fromFormat[i] === 'MM') {
      month = dateString[i];
    }

    if (fromFormat[i] === 'DD') {
      day = dateString[i];
    }
  }

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i] === 'YY' && fromFormat.includes('YYYY')) {
      resultDate.push(year.slice(2));
    }

    if (toFormat[i] === 'YYYY' && fromFormat.includes('YY')) {
      if (year < 30) {
        year = '20' + `${year}`;
        resultDate.push(year);
      } else {
        year = '19' + `${year}`;
        resultDate.push(year);
      }
    }

    if (toFormat[i] === 'YYYY' && fromFormat.includes('YYYY')) {
      resultDate.push(year);
    }

    if (toFormat[i] === 'MM') {
      resultDate.push(month);
    }

    if (toFormat[i] === 'DD') {
      resultDate.push(day);
    }
  }

  return resultDate.join(toFormat[3]);
}

module.exports = formatDate;
