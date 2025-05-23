'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // write code here
  const parts = date.split(fromFormat[3]);

  const parsed = {
    [fromFormat[0]]: parts[0],
    [fromFormat[1]]: parts[1],
    [fromFormat[2]]: parts[2],
  };

  if (parsed['YY'] && !parsed['YYYY']) {
    const yy = Number(parsed['YY']);

    parsed['YYYY'] = yy < 30 ? `20${parsed['YY']}` : `19${parsed['YY']}`;
  }

  if (parsed['YYYY'] && !parsed['YY']) {
    parsed['YY'] = parsed['YYYY'].slice(2);
  }

  return `${parsed[toFormat[0]]}${toFormat[3]}${parsed[toFormat[1]]}${toFormat[3]}${parsed[toFormat[2]]}`;
}

module.exports = formatDate;
