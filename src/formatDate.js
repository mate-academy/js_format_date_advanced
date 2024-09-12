'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateParts = date.split(fromFormat[3]);
  const dateWithFormat = fromFormat.slice(0, 3).reduce((obj, format, i) => {
    obj[format] = dateParts[i];

    return obj;
  }, {});

  const result = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'YY'
      && !dateWithFormat.hasOwnProperty('YY')) {
      result.push(dateWithFormat['YYYY'].slice(-2));
    } else if (toFormat[i] === 'YYYY'
      && !dateWithFormat.hasOwnProperty('YYYY')) {
      result.push(getFullYear(dateWithFormat['YY']));
    } else {
      result.push(dateWithFormat[toFormat[i]]);
    }
  }

  return result.join(toFormat[3]);
}

function getFullYear(year) {
  if (+year < 30) {
    return '20' + year;
  }

  return '19' + year;
}

module.exports = formatDate;
