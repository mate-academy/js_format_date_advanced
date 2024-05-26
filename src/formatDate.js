'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // write code here
  const separator = date.split(fromFormat[3]);
  let formattedDate = [];
  const format = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    format[fromFormat[i]] = separator[i];
  }

  for (let j = 0; j < toFormat.length; j++) {
    if (format.hasOwnProperty(toFormat[j])) {
      formattedDate.push(format[toFormat[j]]);
    }

    if (format.hasOwnProperty('YYYY') && toFormat[j] === 'YY') {
      formattedDate.push(format['YYYY'].slice(2));
    }

    if (format.hasOwnProperty('YY') && toFormat[j] === 'YYYY') {
      if (format['YY'] < 30) {
        formattedDate.push('20'.concat(format['YY']));
      } else {
        formattedDate.push('19'.concat(format['YY']));
      }
    }
  }
  formattedDate = formattedDate.join(`${toFormat[3]}`);

  return formattedDate;
}

module.exports = formatDate;
