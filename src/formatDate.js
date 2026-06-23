'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const newOrder = toFormat.slice(0, -1);
  const newSeparator = toFormat.slice(-1);
  const oldOrder = fromFormat.slice(0, -1);
  const oldSeparator = fromFormat.slice(-1);
  const formatToDate = {};
  let dateParts = date.split(oldSeparator);

  for (let i = 0; i < dateParts.length; i++) {
    formatToDate[oldOrder[i]] = dateParts[i];
  }

  dateParts = [];

  for (const part of newOrder) {
    if (part in formatToDate) {
      dateParts.push(formatToDate[part]);
    } else if (part === 'YYYY') {
      const centuryDigits = formatToDate.YY < 30 ? '20' : '19';

      dateParts.push(centuryDigits + formatToDate.YY);
    } else if (part === 'YY') {
      dateParts.push(formatToDate.YYYY.slice(-2));
    }
  }

  return dateParts.join(newSeparator);
}

module.exports = formatDate;
