'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separator = fromFormat[fromFormat.length - 1];
  const parts = date.split(separator);

  const obj = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    obj[fromFormat[i]] = parts[i];
  }

  if (toFormat.includes('YY') && fromFormat.includes('YYYY')) {
    obj['YY'] = obj['YYYY'].slice(-2);
  }

  if (toFormat.includes('YYYY') && fromFormat.includes('YY')) {
    const yy = Number(obj['YY']);

    if (yy < 30) {
      obj['YYYY'] = yy === 0 ? `2000` : `20${yy}`;
    } else {
      obj['YYYY'] = `19${yy}`;
    }
  }

  const newDate = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    newDate.push(obj[toFormat[i]]);
  }

  const newSeparator = toFormat[toFormat.length - 1];

  return newDate.join(newSeparator);
}

module.exports = formatDate;
