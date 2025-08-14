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
  const fromSeparator = fromFormat[3];
  const toSeparator = toFormat[3];

  const parts = date.split(fromSeparator);

  const dateObject = {};

  for (let i = 0; i < 3; i++) {
    dateObject[fromFormat[i]] = parts[i];
  }

  if (fromFormat.includes('YY') && !toFormat.includes('YY')) {
    const yy = parseInt(dateObject['YY'], 10);

    dateObject['YYYY'] =
      yy < 30 ? `20${dateObject['YY']}` : `19${dateObject['YY']}`;
  } else if (fromFormat.includes('YYYY') && !toFormat.includes('YYYY')) {
    dateObject['YY'] = dateObject['YYYY'].slice(-2);
  }

  const result = [toFormat[0], toFormat[1], toFormat[2]]
    .map((part) => dateObject[part])
    .join(toSeparator);

  return result;
}

module.exports = formatDate;
