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
  const toSeparator = toFormat[3];
  const dateParts = date.split(fromSeparator);

  const dateComponents = {};

  fromFormat.slice(0, 3).forEach((part, index) => {
    dateComponents[part] = dateParts[index];
  });

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    dateComponents['YYYY'] =
      dateComponents['YY'] < 30
        ? `20${dateComponents['YY']}`
        : `19${dateComponents['YY']}`;
  } else if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    dateComponents['YY'] = dateComponents['YYYY'].slice(-2);
  }

  const newDateParts = toFormat.slice(0, 3).map((part) => dateComponents[part]);

  return newDateParts.join(toSeparator);
}

module.exports = formatDate;
