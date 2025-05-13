'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separatorFrom = fromFormat[3];
  const separatorTo = toFormat[3];

  const dateParts = date.split(separatorFrom);
  const map = {};

  for (let i = 0; i < 3; i++) {
    map[fromFormat[i]] = dateParts[i];
  }

  if (toFormat.includes('YYYY') && fromFormat.includes('YY')) {
    const yy = map['YY'];
    const num = Number(yy);

    map['YYYY'] = num < 30 ? `20${yy}` : `19${yy}`;
  }

  if (toFormat.includes('YY') && fromFormat.includes('YYYY')) {
    map['YY'] = map['YYYY'].slice(2);
  }

  const resultParts = toFormat.slice(0, 3).map((format) => map[format]);

  return resultParts.join(separatorTo);
}

module.exports = formatDate;
