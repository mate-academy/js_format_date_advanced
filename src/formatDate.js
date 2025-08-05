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
  const result = [];

  const fromSeparator = fromFormat[fromFormat.length - 1];
  const toSeparator = toFormat[toFormat.length - 1];
  const fromField = fromFormat.slice(0, -1);
  const toField = toFormat.slice(0, -1);

  const dateArr = date.split(fromSeparator);

  for (let i = 0; i < fromField.length; i++) {
    if (fromField[i] === 'DD') {
      day = dateArr[i];
    }

    if (fromField[i] === 'MM') {
      month = dateArr[i];
    }

    if (fromField[i] === 'YYYY') {
      year = dateArr[i];
    }

    if (fromField[i] === 'YY' && toField.includes('YYYY')) {
      if (dateArr[i] < 30) {
        year = `20${dateArr[i]}`;
      } else {
        year = `19${dateArr[i]}`;
      }
    }
  }

  for (let i = 0; i < toField.length; i++) {
    if (toField[i] === 'DD') {
      result[i] = day;
    }

    if (toField[i] === 'MM') {
      result[i] = month;
    }

    if (toField[i] === 'YYYY') {
      result[i] = year;
    }

    if (toField[i] === 'YY') {
      result[i] = year.slice(-2);
    }
  }

  return result.join(toSeparator);
}

module.exports = formatDate;
