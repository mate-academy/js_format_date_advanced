'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateSplitted = date.split(fromFormat[fromFormat.length - 1]);
  const separator = toFormat[toFormat.length - 1];
  const dateFormatted = [];

  const yyyyIndex = fromFormat.indexOf('YYYY');
  const yyIndex = fromFormat.indexOf('YY');
  const yyyy = dateSplitted[yyyyIndex];
  const yy = dateSplitted[yyIndex];

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    dateSplitted[yyyyIndex] = yyyy.slice(-2);
    fromFormat[yyyyIndex] = 'YY';
  }

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    dateSplitted[yyIndex] = yy < 30 ? '20' + yy : '19' + yy;
    fromFormat[yyIndex] = 'YYYY';
  }

  fromFormat.slice(0, -1).forEach((elem) => {
    dateFormatted[toFormat.indexOf(elem)] =
      dateSplitted[fromFormat.indexOf(elem)];
  });

  return dateFormatted.join(`${separator}`);
}

module.exports = formatDate;
