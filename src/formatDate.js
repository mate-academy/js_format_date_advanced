'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const firstSeperator = fromFormat[fromFormat.length - 1];
  const secondSeperator = toFormat[toFormat.length - 1];

  const separatedDate = date.split(`${firstSeperator}`);

  const values = {};

  separatedDate.forEach((el, index) => {
    values[fromFormat[index]] = el;
  });

  if (values.hasOwnProperty('YYYY')) {
    values.YY = values.YYYY.slice(2);
  } else {
    values.YYYY = (+values.YY < 30 && values.YY >= 0)
      ? `20${values.YY}`
      : `19${values.YY}`;
  }

  const formated = [];

  toFormat.slice(0, -1).forEach(el => {
    switch (el) {
      case 'DD':
        formated.push(values.DD);
        break;

      case 'MM':
        formated.push(values.MM);
        break;

      case 'YY':
        formated.push(values.YY);
        break;

      case 'YYYY':
        formated.push(values.YYYY);
        break;
    }
  });

  return formated.join(`${secondSeperator}`);
}

module.exports = formatDate;
