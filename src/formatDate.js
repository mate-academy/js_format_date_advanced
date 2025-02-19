'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldSeparator = fromFormat[3];
  const partsOfDate = date.split(oldSeparator);
  const dateObject = {};

  for (let i = 0; i < 3; i++) {
    dateObject[fromFormat[i]] = partsOfDate[i];
  }

  const newSeparator = toFormat[3];
  const newPartsOfDate = toFormat.slice(0, 3).map((part) => {
    if (part === 'YY' && dateObject['YYYY']) {
      return dateObject['YYYY'].slice(2);
    } else if (part === 'YYYY' && dateObject['YY']) {
      const year = parseInt(dateObject['YY'], 10);

      return year < 30 ? `20${dateObject['YY']}` : `19${dateObject['YY']}`;
    }

    return dateObject[part];
  });

  return newPartsOfDate.join(newSeparator);
}

module.exports = formatDate;
