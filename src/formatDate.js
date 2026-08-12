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
  const parts = date.split(fromSeparator);

  const values = {};

  for (let i = 0; i < 3; i++) {
    const key =
      fromFormat[i] === 'YYYY' || fromFormat[i] === 'YY' ? 'Y' : fromFormat[i];

    values[key] = parts[i];
  }

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    values['Y'] = values['Y'].slice(-2);
  } else if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    const yy = Number(values['Y']);

    values['Y'] = (yy < 30 ? '20' : '19') + values['Y'];
  }

  const result = [];

  for (let i = 0; i < 3; i++) {
    const label = toFormat[i];
    const key = label === 'YYYY' || label === 'YY' ? 'Y' : label;

    result.push(values[key]);
  }

  return result.join(toSeparator);
}

module.exports = formatDate;
