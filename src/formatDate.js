'use strict';
/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const oldFormat = [...fromFormat];
  const newFormat = [...toFormat];
  const oldSeparator = oldFormat.pop();
  const newSeparator = newFormat.pop();
  const dateNonSep = date.split(oldSeparator);
  const result = [];
  let year;
  let month;
  let day;

  const newFormatFourDigits = newFormat.includes('YYYY');
  const newFormatTwoDigits = newFormat.includes('YY');

  for (let i = 0; i < oldFormat.length; i++) {
    if (oldFormat[i] === 'YYYY' && newFormatFourDigits) {
      year = dateNonSep[i];
    }

    if (oldFormat[i] === 'YY' && newFormatTwoDigits) {
      year = dateNonSep[i];
    }

    if (oldFormat[i] === 'YY' && newFormatFourDigits) {
      year = dateNonSep[i] < 30 ? `20${dateNonSep[i]}` : `19${dateNonSep[i]}`;
    }

    if (oldFormat[i] === 'YYYY' && newFormatTwoDigits) {
      year = dateNonSep[i].slice(2);
    }

    if (oldFormat[i].includes('MM')) {
      month = dateNonSep[i];
    }

    if (oldFormat[i].includes('DD')) {
      day = dateNonSep[i];
    }
  }

  for (let i = 0; i < newFormat.length; i++) {
    if (newFormat[i] === 'YYYY' || newFormat[i] === 'YY') {
      result.push(year);
    }

    if (newFormat[i] === 'MM') {
      result.push(month);
    }

    if (newFormat[i] === 'DD') {
      result.push(day);
    }
  }

  return result.join(newSeparator);
}

module.exports = formatDate;
