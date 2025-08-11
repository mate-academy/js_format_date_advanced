'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separator = fromFormat.find((part) => !/[YMD]/.test(part)) || '';
  const dateParts = date.split(separator);
  const dateMap = {};

  fromFormat.forEach((part, i) => {
    if (/[YMD]/.test(part)) {
      dateMap[part] = dateParts[i];
    }
  });

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    dateMap['YY'] = dateMap['YYYY'].slice(-2);
  }

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    const yy = parseInt(dateMap['YY'], 10);

    dateMap['YYYY'] = (yy < 30 ? '20' : '19') + dateMap['YY'];
  }

  const newSeparator = toFormat.find((p) => !/[YMD]/.test(p)) || separator;

  return toFormat
    .filter((part) => /[YMD]/.test(part))
    .map((part) => dateMap[part])
    .join(newSeparator);
}

module.exports = formatDate;
