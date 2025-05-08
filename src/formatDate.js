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
  const fromParts = fromFormat.slice(0, 3);

  const map = {};

  for (let i = 0; i < 3; i++) {
    map[fromParts[i]] = dateParts[i];
  }

  if (map['YYYY'] && toFormat.includes('YY') && !map['YY']) {
    map['YY'] = map['YYYY'].slice(-2);
  }

  if (map['YY'] && toFormat.includes('YYYY') && !map['YYYY']) {
    const yy = parseInt(map['YY'], 10);

    map['YYYY'] = yy < 30 ? `20${map['YY']}` : `19${map['YY']}`;
  }

  const result = toFormat.slice(0, 3).map((part) => map[part]);

  return result.join(toSeparator);
}

module.exports = formatDate;
