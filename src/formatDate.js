'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const chars = '/*-:.,_|';
  let separator = '';
  let yearShort = '';
  let yearFull = '';
  let month = '';
  let day = '';
  const result = [];

  result.length = toFormat.length - 1;

  for (let i = 0; i < date.length; i++) {
    if (chars.includes(date[i])) {
      separator = date[i];
      break;
    }
  }

  const data = date.split(separator);

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i] === 'YY') {
      yearShort = data[i];
      yearFull = +yearShort < 30 ? '20' + yearShort : '19' + yearShort;
    }

    if (fromFormat[i] === 'YYYY') {
      yearFull = data[i];
      yearShort = yearFull.slice(2);
    }

    if (fromFormat[i] === 'DD') {
      day = data[i];
    }

    if (fromFormat[i] === 'MM') {
      month = data[i];
    }
  }

  separator = toFormat[toFormat.length - 1];

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'YYYY') {
      result[i] = yearFull;
    }

    if (toFormat[i] === 'YY') {
      result[i] = yearShort;
    }

    if (toFormat[i] === 'MM') {
      result[i] = month;
    }

    if (toFormat[i] === 'DD') {
      result[i] = day;
    }
  }

  return result.join(separator);
}

module.exports = formatDate;
