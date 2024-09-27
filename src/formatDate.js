/* eslint-disable max-len */
'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldDate = date.split(fromFormat[3]);
  let newDate = [''];

  if (fromFormat.indexOf('YYYY') !== -1) { // if we shorten YYYY to YY
    if (toFormat.indexOf('YY') !== -1) {
      toFormat[toFormat.indexOf('YY')] = 'YYYY';
      oldDate[fromFormat.indexOf('YYYY')] = oldDate[fromFormat.indexOf('YYYY')].toString().slice(2);
    }
  }

  if (fromFormat.indexOf('YY') !== -1) { // if we extend YY to YYYY
    if (toFormat.indexOf('YYYY') !== -1) {
      toFormat[toFormat.indexOf('YYYY')] = 'YY';

      switch (true) {
        case oldDate[fromFormat.indexOf('YY')] < '30': // if we extend YY < 30 to YYYY
        case oldDate[fromFormat.indexOf('YY')] === '00': // if we extend YY = 00 to YYYY
          oldDate[fromFormat.indexOf('YY')] = 20 + '' + oldDate[fromFormat.indexOf('YY')];
          break;

        case oldDate[fromFormat.indexOf('YY')] === '30': // if we extend YY = 30 to YYYY
        case oldDate[fromFormat.indexOf('YY')] > '30': // if we extend YY > 30 to YYYY
          oldDate[fromFormat.indexOf('YY')] = 19 + '' + oldDate[fromFormat.indexOf('YY')];
          break;
      }
    }
  }

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (toFormat[i] === fromFormat[j]) {
        newDate[i] = oldDate[j];
      }
    }
  }
  newDate = newDate.join(toFormat[3]);

  return newDate;
}

module.exports = formatDate;
