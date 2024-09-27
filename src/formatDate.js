'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const splitedDate = date.split(fromFormat[3]);
  const toSeparator = toFormat[3];
  const fromDate = {};

  fromDate[fromFormat[0]] = splitedDate[0];
  fromDate[fromFormat[1]] = splitedDate[1];
  fromDate[fromFormat[2]] = splitedDate[2];

  if (!fromDate.hasOwnProperty('YY') && toFormat.includes('YY')) {
    fromDate.YY = fromDate.YYYY.slice(2);
  }

  if (!fromDate.hasOwnProperty('YYYY') && toFormat.includes('YYYY')) {
    fromDate.YYYY = fromDate.YY < 30 ? `20${fromDate.YY}` : `19${fromDate.YY}`;
  }

  const formatedDate = [
    fromDate[toFormat[0]],
    fromDate[toFormat[1]],
    fromDate[toFormat[2]],
  ].join(toSeparator);

  return formatedDate;
}

module.exports = formatDate;
