'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateSplited = date.split(fromFormat[fromFormat.length - 1]);
  const oldDateStructured = {};
  const result = [];

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    const yyIndex = fromFormat.indexOf('YY');

    fromFormat[yyIndex] = 'YYYY';

    if (dateSplited[yyIndex] < 30) {
      dateSplited[yyIndex] = '20' + dateSplited[yyIndex];
    } else {
      dateSplited[yyIndex] = '19' + dateSplited[yyIndex];
    }
  }

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    const yyIndex = fromFormat.indexOf('YYYY');

    fromFormat[yyIndex] = 'YY';
    dateSplited[yyIndex] = dateSplited[yyIndex].slice(2);
  }

  for (let i = 0; i < dateSplited.length; i++) {
    oldDateStructured[fromFormat[i]] = dateSplited[i];
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    result.push(oldDateStructured[toFormat[i]]);
  }

  return result.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
