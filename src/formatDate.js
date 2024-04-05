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
  const dateParts = date.split(separator);

  const dateMap = {};

  for (let i = 0; i < 3; i++) {
    dateMap[fromFormat[i]] = dateParts[i];
  }

  if (toFormat.includes('YYYY') && dateMap['YY']) {
    const year = parseInt(dateMap['YY'], 10);

    dateMap['YYYY'] = year < 30 ? `20${dateMap['YY']}` : `19${dateMap['YY']}`;
  } else if (toFormat.includes('YY') && dateMap['YYYY']) {
    dateMap['YY'] = dateMap['YYYY'].substring(2);
  }

  const newDateParts = toFormat
    .slice(0, 3)
    .map((part) => dateMap[part] || part);

  return newDateParts.join(toFormat[3]);
}

module.exports = formatDate;
