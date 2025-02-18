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

  const dateObject = {};

  fromFormat.slice(0, 3).forEach((key, index) => {
    dateObject[key] = parts[index];
  });

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    dateObject['YY'] = dateObject['YYYY'].slice(2);
  }

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    const year = parseInt(dateObject['YY'], 10);

    dateObject['YYYY'] =
      year < 30 ? `20${dateObject['YY']}` : `19${dateObject['YY']}`;
  }

  const result = toFormat
    .slice(0, 3)
    .map((key) => dateObject[key])
    .join(toFormat[3]);

  return result;
}

module.exports = formatDate;
