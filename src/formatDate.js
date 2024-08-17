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

  const objectKeys = Object.keys(object);
  const objectValues = Object.values(object);

  let result = [];

  for (let i = 0; i < toFormat.length; i++) {
    for (let j = 0; j < objectKeys.length; j++) {
      if (toFormat[i] === objectKeys[j]) {
        result.push(objectValues[j]);
      }
    }
  }
  result = result.join(toFormat[3]);

  return result;
}
module.exports = formatDate;
