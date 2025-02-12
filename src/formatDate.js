'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const arr = date.split(fromFormat[3]);

  let result = '';
  const hash = {};

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i] === 'YYYY') {
      hash['YYYY'] = arr[i];
    }

    if (fromFormat[i] === 'YY') {
      hash['YY'] = arr[i];
    }

    if (fromFormat[i] === 'DD') {
      hash['DD'] = arr[i];
    }

    if (fromFormat[i] === 'MM') {
      hash['MM'] = arr[i];
    }
  }

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i] === 'YYYY') {
      if (hash['YYYY']) {
        result += hash['YYYY'];
      } else {
        if (Number(hash['YY']) < 30) {
          result += '20' + hash['YY'];
        } else {
          result += '19' + hash['YY'];
        }
      }
      result += toFormat[3];
    }

    if (toFormat[i] === 'YY') {
      if (hash['YY']) {
        result += hash['YY'];
      } else {
        result += hash['YYYY'].slice(-2);
      }
      result += toFormat[3];
    }

    if (toFormat[i] === 'DD') {
      result += hash['DD'];
      result += toFormat[3];
    }

    if (toFormat[i] === 'MM') {
      result += hash['MM'];
      result += toFormat[3];
    }
  }

  return result.slice(0, -1);
}

module.exports = formatDate;
