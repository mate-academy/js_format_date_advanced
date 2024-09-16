'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const value = date.split(fromFormat[3]);
  const result = [];

  for (let k = 0; k < 3; k++) {
    switch (k) {
      case toFormat.indexOf('MM'):
        result.push(value[fromFormat.indexOf('MM')]);
        break;

      case toFormat.indexOf('DD'):
        result.push(value[fromFormat.indexOf('DD')]);
        break;

      case toFormat.indexOf('YY'):
        switch (value.join('').length) {
          case 6:
            result.push(value[fromFormat.indexOf('YY')]);
            break;

          case 8:
            result.push(value[fromFormat.indexOf('YYYY')]);
            break;
        }
        break;

      case toFormat.indexOf('YYYY'):
        switch (value.join('').length) {
          case 6:
            result.push(value[fromFormat.indexOf('YY')]);
            break;

          case 8:
            result.push(value[fromFormat.indexOf('YYYY')]);
            break;
        }
        break;

      default:
        break;
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'YYYY' && result[i].length === 2) {
      if (+result[i] >= 30) {
        result[i] = `19${result[i]}`;
      }

      if (+result[i] < 30) {
        result[i] = `20${result[i]}`;
      }
    }

    if (toFormat[i] === 'YY' && result[i].length === 4) {
      result[i] = result[i].split('').slice(2).join('');
    }
  }

  return result.join(toFormat[3]);
}

module.exports = formatDate;
