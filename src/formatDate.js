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

  const dateParts = {};
  const dateValues = date.split(fromSeparator);

  for (let i = 0; i < fromFormat.length - 1; i++) {
    const key = fromFormat[i];
    let value = dateValues[i];

    if (key === 'YY') {
      const year = parseInt(value);

      value = year < 30 ? '20' + value : '19' + value;
      dateParts['YYYY'] = value;
    } else if (key === 'YYYY') {
      dateParts['YYYY'] = value;

      dateParts['YY'] = value.slice(-2);
    } else {
      dateParts[key] = value;
    }
  }

  return toFormat
    .slice(0, -1)
    .map((part) => dateParts[part])
    .join(toSeparator);
}

module.exports = formatDate;
