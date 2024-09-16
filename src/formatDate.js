'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const formatedDate = [];

  const oldSeparator = fromFormat[fromFormat.length - 1];
  const newSeparator = toFormat[toFormat.length - 1];

  const currentDate = date.split(`${oldSeparator}`);
  const yearIndex = fromFormat.indexOf('YYYY') === -1
    ? fromFormat.indexOf('YY') : fromFormat.indexOf('YYYY');

  const day = currentDate[fromFormat.indexOf('DD')];
  const month = currentDate[fromFormat.indexOf('MM')];
  const shortYear = currentDate[yearIndex].slice(-2);
  const longYear = (+shortYear < 30 && +shortYear >= 0) ? `20${shortYear}` : `19${shortYear}`;

  for (const char of toFormat) {
    switch (char) {
      case 'DD':
        formatedDate.push(day);

        break;

      case 'MM':
        formatedDate.push(month);

        break;

      case 'YY':
        formatedDate.push(shortYear);

        break;

      case 'YYYY':
        formatedDate.push(longYear);

        break;

      default:
        break;
    }
  }

  return formatedDate.join(`${newSeparator}`);
}

module.exports = formatDate;
