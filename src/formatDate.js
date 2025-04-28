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
  const resultParts = [];

  const fromParts = fromFormat.slice(0, -1);
  const toParts = toFormat.slice(0, -1);

  for (let i = 0; i < fromParts.length; i++) {
    dateMap[fromParts[i]] = dateParts[i];
  }

  for (let i = 0; i < toParts.length; i++) {
    const part = toParts[i];
    let value = dateMap[part];

    if (part === 'YYYY' && !value) {
      const yy = Number(dateMap['YY']);

      value = yy < 30 ? '20' + dateMap['YY'] : '19' + dateMap['YY'];
    }

    if (part === 'YY' && !value) {
      value = dateMap['YYYY'].slice(-2);
    }

    resultParts.push(value);
  }

  return resultParts.join(toSeparator);
}

module.exports = formatDate;
