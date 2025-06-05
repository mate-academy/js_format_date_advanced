'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromFormatSeparator = fromFormat[3];
  const toFormatSeparator = toFormat[3];
  const dateObject = {};
  const result = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    dateObject[fromFormat[i]] = date.split(fromFormatSeparator)[i];
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'YYYY') {
      if (dateObject['YYYY']) {
        result.push(dateObject['YYYY']);
      } else {
        if (dateObject['YY'] >= 30) {
          result.push('19' + dateObject['YY']);
        } else {
          result.push('20' + dateObject['YY']);
        }
      }
    } else if (toFormat[i] === 'YY') {
      if (dateObject['YY']) {
        result.push(dateObject['YY']);
      } else {
        const temp = `${dateObject['YYYY']}`;

        result.push(temp.slice(-2));
      }
    } else if (toFormat[i] === 'MM') {
      result.push(dateObject['MM']);
    } else {
      result.push(dateObject['DD']);
    }
  }

  return result.join(toFormatSeparator);
}

module.exports = formatDate;
