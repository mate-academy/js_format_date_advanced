'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const result = date.split(fromFormat[3]);

  const formatFrom = fromFormat.slice(0, 3);
  const list = {};

  for (let i = 0; i < formatFrom.length; i++) {
    list[formatFrom[i]] = result[i];
  }

  const formatTo = toFormat.slice(0, 3);
  const newParts = [];

  for (let i = 0; i < formatTo.length; i++) {
    if (formatTo[i] === 'DD') {
      newParts.push(list['DD']);
    }

    if (formatTo[i] === 'MM') {
      newParts.push(list['MM']);
    }

    if (formatTo[i] === 'YY') {
      if (list['YYYY']) {
        newParts.push(list['YYYY'].slice(-2));
      } else {
        newParts.push(list['YY']);
      }
    }

    if (formatTo[i] === 'YYYY') {
      if (list['YY']) {
        if (Number(list['YY']) < 30) {
          newParts.push('20' + list['YY']);
        } else {
          newParts.push('19' + list['YY']);
        }
      } else {
        newParts.push(list['YYYY']);
      }
    }
  }

  return newParts.join(toFormat[3]);
}

module.exports = formatDate;
