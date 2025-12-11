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
  const joiner = toFormat[3];
  const parts = date.split(separator);

  const dateParts = {};

  for (let i = 0; i < 3; i++) {
    dateParts[fromFormat[i]] = parts[i];
  }

  if ('YY' in dateParts && toFormat.includes('YYYY')) {
    const yy = dateParts['YY'];

    dateParts['YYYY'] = +yy < 30 ? `20${yy}` : `19${yy}`;
  } else if ('YYYY' in dateParts && toFormat.includes('YY')) {
    const yyyy = dateParts['YYYY'];

    dateParts['YY'] = yyyy.slice(-2);
  }

  const newDate = [
    dateParts[toFormat[0]],
    dateParts[toFormat[1]],
    dateParts[toFormat[2]],
  ];

  return newDate.join(joiner);
}

module.exports = formatDate;
