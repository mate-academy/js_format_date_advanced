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

  const oldDateParts = date.split(oldSeparator);

  const dateComponents = fromFormat.slice(0, -1).reduce((acc, key, i) => {
    acc[key] = oldDateParts[i];

    return acc;
  }, {});

  if (dateComponents['YY']) {
    dateComponents['YYYY'] =
      dateComponents['YY'] < 30
        ? '20' + dateComponents['YY']
        : '19' + dateComponents['YY'];
  } else {
    dateComponents['YY'] = dateComponents['YYYY'].substring(2);
  }

  return toFormat
    .slice(0, -1)
    .map((key) => dateComponents[key])
    .join(newSeparator);
}

module.exports = formatDate;
