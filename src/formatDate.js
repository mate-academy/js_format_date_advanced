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

  if (typeof date !== 'string') {
    return null;
  }

  if (!Array.isArray(fromFormat) || !Array.isArray(toFormat)) {
    return null;
  }

  fromFormat.forEach((el, index) => {
    if (el !== separator) {
      dateComponents[el] = dateParts[index];
    }
  });

  if (dateComponents['YY'] && dateComponents['YY'].length === 2) {
    const yearPrefix = parseInt(dateComponents['YY'], 10) < 30 ? '20' : '19';

    dateComponents['YYYY'] = yearPrefix + dateComponents['YY'];
  }

  if (
    typeof dateComponents['YYYY'] === 'string' &&
    dateComponents['YYYY'].length === 4
  ) {
    if (toFormat.includes('YY')) {
      dateComponents['YY'] = dateComponents['YYYY'].slice(-2);
    }
  }

  const formattedDate =
    toFormat
      .filter((el) => el !== newSeparator)
      .map(el => dateComponents[el] !== undefined ? dateComponents[el] : '')
      .join(newSeparator);

  return formattedDate;
}

module.exports = formatDate;
