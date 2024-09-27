'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separatorOld = fromFormat[3];
  const separatorNew = toFormat[3];
  const correctDate = date.split(separatorOld);
  const newDateFormat = [];
  const dateObject = {};

  for (let i = 0; i < fromFormat.length; i++) {
    dateObject[fromFormat[i]] = correctDate[i];
  }

  if (dateObject.hasOwnProperty('YYYY')) {
    dateObject.YY = dateObject.YYYY.slice(2);
  }

  dateObject.YYYY = '19' + dateObject.YY;

  if (dateObject.YY < 30) {
    dateObject.YYYY = '20' + dateObject.YY;
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    newDateFormat.push(dateObject[toFormat[i]]);
  }

  return newDateFormat.join(separatorNew);
}

module.exports = formatDate;
