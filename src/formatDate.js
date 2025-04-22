'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const separatorFrom = fromFormat[fromFormat.length - 1];
  const separatorTo = toFormat[toFormat.length - 1];

  const dateParts = date.split(separatorFrom);
  const dateMap = {};

  fromFormat.slice(0, -1).forEach((part, index) => {
    dateMap[part] = dateParts[index];
  });

  const formattedDate = toFormat
    .slice(0, -1)
    .map((part) => {
      if (part === 'YY' && dateMap['YYYY']) {
        return dateMap['YYYY'].slice(-2);
      } else if (part === 'YYYY' && dateMap['YY']) {
        const year = parseInt(dateMap['YY'], 10);

        return year < 30 ? `20${dateMap['YY']}` : `19${dateMap['YY']}`;
      }

      return dateMap[part];
    })
    .join(separatorTo);

  return formattedDate;
}

module.exports = formatDate;
