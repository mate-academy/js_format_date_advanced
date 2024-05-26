'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat[fromFormat.length - 1];
  const toSeparator = toFormat[toFormat.length - 1];
  const dateParts = date.split(`${fromSeparator}`);
  let year = '';
  let month = '';
  let day = '';
  const result = [];

  for (let i = 0; i < dateParts.length; i++) {
    if (fromFormat[i] === 'YYYY') {
      year = dateParts[i];
    }

    if (fromFormat[i] === 'YY') {
      year = dateParts[i];
    }

    if (fromFormat[i] === 'MM') {
      month = dateParts[i];
    }

    if (fromFormat[i] === 'DD') {
      day = dateParts[i];
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'YY' && fromFormat.includes('YYYY')) {
      result.push(year.slice(2));
    }

    if (toFormat[i] === 'YYYY' && fromFormat.includes('YY')) {
      if (+year < 30) {
        year = '20' + `${year}`;
        result.push(year);
      } else {
        year = '19' + `${year}`;
        result.push(year);
      }
    }

    if (toFormat[i] === 'YYYY' && fromFormat.includes('YYYY')) {
      result.push(year);
    }

    if (toFormat[i] === 'MM') {
      result.push(month);
    }

    if (toFormat[i] === 'DD') {
      result.push(day);
    }
  }

  return result.join(`${toSeparator}`);
}

module.exports = formatDate;
