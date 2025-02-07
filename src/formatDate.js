'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separator = fromFormat[3];
  const toSeparator = toFormat[3];

  const dateParts = date.split(separator);
  const dateMap = {};

  fromFormat.slice(0, 3).forEach((part, index) => {
    dateMap[part] = dateParts[index];
  });

  if (dateMap['YY']) {
    const year = parseInt(dateMap['YY'], 10);

    dateMap['YYYY'] = year < 30 ? `20${dateMap['YY']}` : `19${dateMap['YY']}`;
  } else if (dateMap['YYYY']) {
    dateMap['YY'] = dateMap['YYYY'].slice(-2);
  }

  return toFormat
    .slice(0, 3)
    .map((part) => dateMap[part])
    .join(toSeparator);
}

module.exports = formatDate;
