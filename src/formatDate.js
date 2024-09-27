'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dates = date.split(fromFormat[3]);
  const datesObject = {};
  const result = [];

  for (let i = 0; i < 3; i++) {
    datesObject[fromFormat[i]] = dates[i];
  }

  for (const el of toFormat) {
    switch (el) {
      case 'DD' :
        result.push(datesObject['DD']);

        break;

      case 'MM' :
        result.push(datesObject['MM']);

        break;

      case 'YYYY' :
        if (fromFormat.includes('YYYY')) {
          result.push(datesObject['YYYY']);
        } else {
          if (datesObject['YY'] >= 30) {
            result.push('19' + datesObject['YY']);
          } else {
            result.push('20' + datesObject['YY']);
          }
        }

        break;

      case 'YY' :
        if (fromFormat.includes('YY')) {
          result.push(datesObject['YY']);
        } else {
          result.push(datesObject['YYYY'].slice(2));
        }
    }
  }

  return result.join(toFormat[3]);
}

module.exports = formatDate;
