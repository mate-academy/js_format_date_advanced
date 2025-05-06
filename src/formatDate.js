'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSep = fromFormat[3];
  const toSep = toFormat[3];

  const fromParts = date.split(fromSep);
  const formatMap = {};

  // Пройтись по частинах вхідної дати
  for (let i = 0; i < 3; i++) {
    const formatKey = fromFormat[i];
    let value = fromParts[i];

    if (formatKey === 'YY') {
      // Розширити YY до YYYY
      const num = parseInt(value, 10);

      value =
        num < 30
          ? `20${value.padStart(2, '0')}`
          : `19${value.padStart(2, '0')}`;
      formatMap['YYYY'] = value;
      formatMap['YY'] = value.slice(-2);
    } else if (formatKey === 'YYYY') {
      formatMap['YYYY'] = value;
      formatMap['YY'] = value.slice(-2);
    } else {
      formatMap[formatKey] = value;
    }
  }

  // Побудувати результат
  const result = toFormat.slice(0, 3).map((part) => formatMap[part]);

  return result.join(toSep);
}

module.exports = formatDate;
