'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const pastSeparator = fromFormat[fromFormat.length - 1];
  const futureSeparator = toFormat[toFormat.length - 1];
  const arrDate = date.split(`${pastSeparator}`);
  const yearIndex = fromFormat.indexOf('YYYY') === -1
    ? fromFormat.indexOf('YY') : fromFormat.indexOf('YYYY');

  const day = arrDate[fromFormat.indexOf('DD')];
  const month = arrDate[fromFormat.indexOf('MM')];
  const year = arrDate[yearIndex].slice(-2);
  const fullYear = (+year < 22 && +year >= 0) ? `20${year}` : `19${year}`;

  const newDate = [];

  for (const char of toFormat) {
    switch (char) {
      case 'DD':
        newDate.push(day);

        break;

      case 'MM':
        newDate.push(month);

        break;

      case 'YY':
        newDate.push(year);

        break;

      case 'YYYY':
        newDate.push(fullYear);

        break;
    }
  }

  return newDate.join(`${futureSeparator}`);
}

module.exports = formatDate;
