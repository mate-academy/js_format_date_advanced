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
  const data = date.split(fromFormat[3]);

  const object = {};

  for (let i = 0; i < 3; i++) {
    object[fromFormat[i]] = data[i];
  }

  if (object.YYYY) {
    object.YY = object.YYYY.slice(2);
  }

  if (object.YY < 30) {
    object.YYYY = '20' + `${object.YY}`;
  } else {
    object.YYYY = '19' + `${object.YY}`;
  }

  const updatedDate = [];

  for (const el of toFormat) {
    if (el in object) {
      updatedDate.push(object[el]);
    }
  }

  return updatedDate.join(toFormat[3]);
}

module.exports = formatDate;
