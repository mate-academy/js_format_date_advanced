'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const splitedDate = date.split(fromFormat[fromFormat.length - 1]);
  let year;
  let month;
  let day;

  for (let i = 0; i < fromFormat.length; i++) {
    switch (fromFormat[i]) {
      case 'YYYY':
        year = splitedDate[i];
        break;

      case 'YY':
        if (+splitedDate[i] >= 30) {
          year = `19${splitedDate[i]}`;
        } else {
          year = `20${splitedDate[i]}`;
        }
        break;

      case 'MM':
        month = splitedDate[i];
        break;

      case 'DD':
        day = splitedDate[i];
        break;

      default:
        break;
    }
  }

  const formatSeparator = toFormat[toFormat.length - 1];
  const result = [];

  for (let i = 0; i < toFormat.length; i++) {
    switch (toFormat[i]) {
      case 'YYYY':
        result.push(year);
        break;

      case 'YY':
        result.push(year.slice(2));
        break;

      case 'MM':
        result.push(month);
        break;

      case 'DD':
        result.push(day);
        break;

      default:
        break;
    }
  }

  return result.join(formatSeparator);
}

module.exports = formatDate;
