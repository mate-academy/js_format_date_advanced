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
  const parts = date.split(fromSep);
  const dateParts = {};

  for (let i = 0; i < 3; i++) {
    dateParts[fromFormat[i]] = parts[i];
  }

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    const year = parseInt(dateParts['YY'], 10);
    dateParts['YYYY'] = year < 30 ? `20${dateParts['YY']}` : `19${dateParts['YY']}`;
    } else if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    dateParts['YY'] = dateParts['YYYY'].slice(-2);
  }

  return [dateParts[toFormat[0]], dateParts[toFormat[1]], dateParts[toFormat[2]]].join(toSep);
  
}

module.exports = formatDate;
