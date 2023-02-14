'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const dateArray = date.split(fromFormat[3]);
  const object = {};
  const newDate = [];

  for (let i = 0; i < 3; i++) {
    object[fromFormat[i]] = dateArray[i];
  };

  if (object.YYYY) {
    object.YY = object.YYYY.slice(2);
  };

  if (object.YY < 30) {
    object.YYYY = '20' + `${object.YY}`;
  } else {
    object.YYYY = '19' + `${object.YY}`;
  }

  for (let i = 0; i < 3; i++) {
    newDate.push(object[toFormat[i]]);
  }

  return newDate.join(toFormat[toFormat.length - 1]);
};

module.exports = formatDate;
