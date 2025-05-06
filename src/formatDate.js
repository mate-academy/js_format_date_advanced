'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldSeparator = fromFormat[3];
  const newSeparator = toFormat[3];

  const getDateArr = date.split(oldSeparator);

  const oldFormat = [...fromFormat].slice(0, 3);
  const newFormat = [...toFormat].slice(0, 3);

  const oldFormatIndexY = oldFormat.findIndex((part) => part.includes('Y'));
  const oldFormatIndexM = oldFormat.findIndex((part) => part.includes('M'));
  const oldFormatIndexD = oldFormat.findIndex((part) => part.includes('D'));

  const newFormatIndexY = newFormat.findIndex((part) => part.includes('Y'));
  const newFormatIndexM = newFormat.findIndex((part) => part.includes('M'));
  const newFormatIndexD = newFormat.findIndex((part) => part.includes('D'));

  let year = getDateArr[oldFormatIndexY];
  const month = getDateArr[oldFormatIndexM];
  const day = getDateArr[oldFormatIndexD];

  if (oldFormat[oldFormatIndexY].length < newFormat[newFormatIndexY].length) {
    if (Number(year) < 30) {
      year = '20' + year;
    } else {
      year = '19' + year;
    }
  }

  if (oldFormat[oldFormatIndexY].length > newFormat[newFormatIndexY].length) {
    year = year.slice(2);
  }

  const result = [];

  result[newFormatIndexY] = year;
  result[newFormatIndexM] = month;
  result[newFormatIndexD] = day;

  return result.join(newSeparator);
}

module.exports = formatDate;
