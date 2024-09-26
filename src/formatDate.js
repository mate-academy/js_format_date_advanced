'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateSplitted = date.split(fromFormat[3]);
  const dateComponents = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    switch (fromFormat[i]) {
      case 'DD':
        dateComponents.DD = dateSplitted[i];
        break;
      case 'MM':
        dateComponents.MM = dateSplitted[i];
        break;
      case 'YY':
        dateComponents.YY = dateSplitted[i];

        dateComponents.YYYY = dateSplitted[i] < 30
          ? '20' + dateSplitted[i]
          : '19' + dateSplitted[i];
        break;
      case 'YYYY':
        dateComponents.YYYY = dateSplitted[i];
        dateComponents.YY = dateSplitted[i].slice(2);

        break;
      default:
        break;
    }
  }

  const result = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    result.push(dateComponents[toFormat[i]]);
  }

  return result.join(toFormat[3]);
}

module.exports = formatDate;
