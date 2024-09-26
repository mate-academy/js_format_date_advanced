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
  const dateParts = date.split(separator);

  const dateCompare = {};

  fromFormat.forEach((part, index) => {
    switch (part) {
      case 'YYYY':
        dateCompare['YYYY'] = dateParts[index];
        break;
      case 'YY':
        dateCompare['YY'] = dateParts[index];
        break;
      case 'MM':
        dateCompare['MM'] = dateParts[index];
        break;
      case 'DD':
        dateCompare['DD'] = dateParts[index];
        break;
      default:
        break;
    }
  });

  const newSeparator = toFormat[toFormat.length - 1];

  const newDateParts = toFormat.slice(0, -1).map((part) => {
    switch (part) {
      case 'YYYY':
        if (dateCompare['YY']) {
          const yy = parseInt(dateCompare['YY']);

          return yy < 30 ? `20${dateCompare['YY']}` : `19${dateCompare['YY']}`;
        }

        return dateCompare['YYYY'];
      case 'YY':
        if (dateCompare['YYYY']) {
          return dateCompare['YYYY'].slice(-2);
        }

        return dateCompare['YY'];
      case 'MM':
        return dateCompare['MM'];
      case 'DD':
        return dateCompare['DD'];
      default:
        return '';
    }
  });

  return newDateParts.join(newSeparator);
}

module.exports = formatDate;
