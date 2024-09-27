'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldDate = date.split(fromFormat[3]); // [x, y, z]
  const newDate = [];

  // dd
  const ddIndexFrom = fromFormat.indexOf('DD');
  const ddIndexTo = toFormat.indexOf('DD');

  newDate[ddIndexTo] = oldDate[ddIndexFrom];

  // mm
  const mmIndexFrom = fromFormat.indexOf('MM');
  const mmIndexTo = toFormat.indexOf('MM');

  newDate[mmIndexTo] = oldDate[mmIndexFrom];

  // yy
  let yyIndexFrom;
  let yyIndexTo;

  switch (true) {
    case fromFormat.includes('YYYY') && toFormat.includes('YYYY'):
      yyIndexFrom = fromFormat.indexOf('YYYY');
      yyIndexTo = toFormat.indexOf('YYYY');

      newDate[yyIndexTo] = oldDate[yyIndexFrom];
      break;

    case fromFormat.includes('YY') && toFormat.includes('YYYY'):
      yyIndexFrom = fromFormat.indexOf('YY');
      yyIndexTo = toFormat.indexOf('YYYY');

      if (+oldDate[yyIndexFrom] < 30) {
        newDate[yyIndexTo] = '20' + oldDate[yyIndexFrom];
      } else {
        newDate[yyIndexTo] = '19' + oldDate[yyIndexFrom];
      }
      break;

    case fromFormat.includes('YYYY') && toFormat.includes('YY'):
      yyIndexFrom = fromFormat.indexOf('YYYY');
      yyIndexTo = toFormat.indexOf('YY');

      newDate[yyIndexTo] = oldDate[yyIndexFrom].slice(-2);
      break;
  }

  // newdate
  return newDate.join(toFormat[3]);
}

module.exports = formatDate;
