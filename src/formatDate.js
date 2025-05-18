'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldSeparator = fromFormat[fromFormat.length - 1];
  const newSeparator = toFormat[toFormat.length - 1];

  const pureDate = date.split(oldSeparator);
  const oldDateParts = fromFormat.slice(0, -1);
  const newDateParts = toFormat.slice(0, -1);

  const dateObject = {};

  for (let i = 0; i < oldDateParts.length; i++) {
    dateObject[oldDateParts[i]] = pureDate[i];
  }

  if (
    toFormat.includes('YY') &&
    dateObject.YY === undefined &&
    dateObject.YYYY
  ) {
    dateObject.YY = dateObject.YYYY.slice(2);
    delete dateObject.YYYY;
  }

  if (
    toFormat.includes('YYYY') &&
    dateObject.YYYY === undefined &&
    dateObject.YY
  ) {
    const numb = +dateObject.YY;

    dateObject.YYYY = (numb < 30 ? '20' : '19') + dateObject.YY;
    delete dateObject.YY;
  }

  const result = [];

  for (const part of newDateParts) {
    result.push(dateObject[part]);
  }

  return result.join(newSeparator);
}

module.exports = formatDate;
