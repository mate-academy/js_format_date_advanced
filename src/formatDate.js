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
  const dateSeparate = date.split(separator);
  const formaPart = fromFormat.slice(0, -1);
  const oldFormat = {};

  for (let i = 0; i < formaPart.length; i++) {
    oldFormat[formaPart[i]] = dateSeparate[i];
  }

  const hasShort = toFormat.includes('YY');
  const hasLong = toFormat.includes('YYYY');

  if (hasShort && oldFormat.YYYY) {
    oldFormat.YY = oldFormat.YYYY.slice(-2);
  } else if (hasLong && oldFormat.YY) {
    const shortYear = Number(oldFormat.YY);

    oldFormat.YYYY = shortYear < 30 ? `20${oldFormat.YY}` : `19${oldFormat.YY}`;
  }

  const separatorNew = toFormat[toFormat.length - 1];
  const formaPartNew = toFormat.slice(0, -1);
  const newDateParts = [];

  for (let i = 0; i < formaPartNew.length; i++) {
    const part = formaPartNew[i];

    newDateParts.push(oldFormat[part]);
  }

  return newDateParts.join(separatorNew);
}

module.exports = formatDate;
