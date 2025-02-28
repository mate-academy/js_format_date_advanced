'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat[3];
  const dateParts = date.split(fromSeparator);
  const dateObj = {};

  fromFormat.slice(0, 3).forEach((formatPart, index) => {
    dateObj[formatPart] = dateParts[index];
  });

  if (dateObj.YYYY && !toFormat.includes('YYYY')) {
    dateObj.YY = dateObj.YYYY.slice(-2);
    delete dateObj.YYYY;
  }

  if (dateObj.YY && toFormat.includes('YYYY')) {
    const year = parseInt(dateObj.YY);

    dateObj.YYYY = year < 30 ? '20' + dateObj.YY : '19' + dateObj.YY;
    delete dateObj.YY;
  }

  const toSeparator = toFormat[3];
  const newDateParts = toFormat
    .slice(0, 3)
    .map((formatPart) => dateObj[formatPart]);
  const formattedDate = newDateParts.join(toSeparator);

  return formattedDate;
}

module.exports = formatDate;
