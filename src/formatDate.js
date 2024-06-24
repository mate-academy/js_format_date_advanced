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
  const dateComponents = {};
  const newSeparator = toFormat[toFormat.length - 1];

  fromFormat.forEach((el, index) => {
    if (el !== separator) {
      dateComponents[el] = dateParts[index];
    }
  });

  if (dateComponents['YY']) {
    dateComponents['YYYY'] =
      dateComponents['YY'] < 30
        ? '20' + dateComponents['YY']
        : '19' + dateComponents['YY'];
  }

  if (dateComponents['YYYY'] && toFormat.includes('YY')) {
    dateComponents['YY'] = dateComponents['YYYY'].slice(-2);
  }

  const formattedDate = toFormat
    .filter((el) => el !== newSeparator)
    .map((el) => dateComponents[el])
    .join(newSeparator);

  return formattedDate;
}

module.exports = formatDate;
