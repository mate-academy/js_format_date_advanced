'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat[fromFormat.length - 1];
  const toSeparator = toFormat[toFormat.length - 1];
  const dateParts = date.split(fromSeparator);
  const dateMap = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    dateMap[fromFormat[i]] = dateParts[i];
  }

  if ('YY' in dateMap && !('YYYY' in dateMap)) {
    const year = parseInt(dateMap['YY'], 10);

    dateMap['YYYY'] = year < 30 ? `20${dateMap['YY']}` : `19${dateMap['YY']}`;
  } else if ('YYYY' in dateMap && !('YY' in dateMap)) {
    dateMap['YY'] = dateMap['YYYY'].slice(-2);
  }

  const formattedDate = toFormat
    .slice(0, -1)
    .map((part) => dateMap[part])
    .join(toSeparator);

  return formattedDate;
}

module.exports = formatDate;
