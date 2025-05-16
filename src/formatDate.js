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
  const fromMap = {
    [fromFormat[0]]: dateParts[0],
    [fromFormat[1]]: dateParts[1],
    [fromFormat[2]]: dateParts[2],
  };

  const resultParts = toFormat.slice(0, 3).map((part) => {
    if (part === 'YYYY') {
      if (fromMap['YYYY']) {
        return fromMap['YYYY'];
      }

      const yy = parseInt(fromMap['YY'], 10);

      return yy < 30 ? '20' + fromMap['YY'] : '19' + fromMap['YY'];
    }

    if (part === 'YY') {
      if (fromMap['YY']) {
        return fromMap['YY'];
      }

      return fromMap['YYYY'].slice(2);
    }

    return fromMap[part];
  });

  return resultParts.join(toSeparator);
}

module.exports = formatDate;
