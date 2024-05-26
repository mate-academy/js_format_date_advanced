'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separator = fromFormat[fromFormat.length - 1];
  const splited = date.split(separator);
  let year;
  let day;
  let month;

  for (let i = 0; i < fromFormat.length; i++) {
    const target = fromFormat[i];

    switch (target) {
      case 'YYYY':
        year = splited[i];
        break;

      case 'YY':
        year = splited[i];
        break;

      case 'DD':
        day = splited[i];
        break;

      case 'MM':
        month = splited[i];
        break;
    }
  }

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    year = year.slice(2);
  }

  if (fromFormat.includes('YY') && year >= 30 && toFormat.includes ('YYYY')) {
    year = 19 + year;
  }

  if (fromFormat.includes('YY') && year < 30 && toFormat.includes('YYYY')) {
    year = 20 + year;
  }


  const result = [];

  for (let i = 0; i < toFormat.length; i++) {
    const target = toFormat[i];

    switch (target) {
      case 'YYYY':
        result[i] = year;
        break;

      case 'YY':
        result[i] = year;
        break;

      case 'DD':
        result[i] = day;
        break;

      case 'MM':
        result[i] = month;
        break;
    }
  }

  const finishResult = result.join(toFormat[toFormat.length - 1]);

  return finishResult;

}

module.exports = formatDate;
