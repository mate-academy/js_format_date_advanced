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

  const parts = date.split(separator);
  const partsObj = {};

  fromFormat.slice(0, 3).forEach((format, index) => {
    partsObj[format] = parts[index];
  });

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    const yy = partsObj['YY'];

    if (yy < 30) {
      partsObj['YYYY'] = `20${yy}`;
    } else {
      partsObj['YYYY'] = `19${yy}`;
    }
  } else if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    partsObj['YY'] = partsObj['YYYY'].slice(-2);
  }

  const result = [];

  for (const part of toFormat.slice(0, 3)) {
    if (partsObj[part]) {
      result.push(partsObj[part]);
    }
  }

  return result.join(toFormat[3]);
}

module.exports = formatDate;
