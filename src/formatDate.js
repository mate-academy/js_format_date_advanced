'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const [fromY, fromM, fromD, fromSep] = fromFormat;
  const [toY, toM, toD, toSep] = toFormat;

  const dateParts = date.split(fromSep);
  const map = {};

  [fromY, fromM, fromD].forEach((part, index) => {
    const value = dateParts[index];

    if (part === 'YY') {
      map['YY'] = value;
      map['YYYY'] = parseInt(value, 10) < 30 ? '20' + value : '19' + value;
    } else if (part === 'YYYY') {
      map['YYYY'] = value;
      map['YY'] = value.slice(-2);
    } else {
      map[part] = value;
    }
  });

  const formattedDate = [toY, toM, toD].map((key) => map[key]).join(toSep);

  return formattedDate;
}

module.exports = formatDate;
