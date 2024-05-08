'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const splited = date.split(fromFormat[3]);

  splited.push(fromFormat[3]);

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
      const index = fromFormat.indexOf('YYYY');

      fromFormat[index] = 'YY';

      splited[index] = splited[index]
        .split('')
        .slice(2, splited.length)
        .join('');
    } else if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
      const index = fromFormat.indexOf('YY');

      fromFormat[index] = 'YYYY';

      if (splited[index] < 30) {
        splited[index] = '20' + splited[index];
      } else {
        splited[index] = '19' + splited[index];
      }
    }

    if (toFormat[i] === fromFormat[i]) {
      toFormat[i] = splited[i];
    } else {
      for (let j = 0; j < fromFormat.length; j++) {
        if (toFormat[i] === fromFormat[j]) {
          toFormat[i] = splited[j];
        }
      }
    }
  }

  const joiner = toFormat.slice(-1);

  const result = toFormat.slice(0, 3).join(joiner[0]);

  return result;
}
module.exports = formatDate;
