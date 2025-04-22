'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separatorFrom = fromFormat.pop();
  const separatorTo = toFormat.pop();

  const dateParts = date.split(separatorFrom);
  const dateMap = {};

  fromFormat.forEach((part, index) => {
    dateMap[part] = dateParts[index];
  });

  const formattedDate = toFormat
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
