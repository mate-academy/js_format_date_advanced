'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
const formatDate = (date, fromFormat, toFormat) => {
  const DATE_LENGTH = 3;

  const initialSeparator = fromFormat[fromFormat.length - 1];
  const targetSeparator = toFormat[toFormat.length - 1];

  const initialDateParts = date.split(initialSeparator);

  const dateParts = {};

  for (let i = 0; i < DATE_LENGTH; i++) {
    dateParts[fromFormat[i]] = initialDateParts[i];
  }

  if (!dateParts['YYYY']) {
    const shortYear = dateParts['YY'];

    dateParts['YYYY'] = (shortYear < 30 ? '20' : '19') + shortYear;
  }

  if (!dateParts['YY']) {
    dateParts['YY'] = dateParts['YYYY'].slice(-2);
  }

  const targetDateParts = [];

  for (let i = 0; i < DATE_LENGTH; i++) {
    targetDateParts.push(dateParts[toFormat[i]]);
  }

  return targetDateParts.join(targetSeparator);
};

module.exports = formatDate;
