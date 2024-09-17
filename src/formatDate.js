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
  const newDate = [];
  let chunk;
  let index;

  for (let i = 0; i < toFormat.length - 1; i++) {
    index = fromFormat.indexOf(toFormat[i]);
    chunk = splitedDate[index];

    if (index < 0) {
      if (toFormat[i].length === 4) {
        index = fromFormat.indexOf(toFormat[i].slice(0, 2));
        chunk = splitedDate[index];

        if (splitedDate[index] < 30) {
          chunk = '20' + chunk;
        } else {
          chunk = '19' + chunk;
        }
      } else {
        index = fromFormat.indexOf('YY' + toFormat[i]);
        chunk = splitedDate[index].slice(2, 4);
      }
    }

    newDate.push(chunk);
  }

  return newDate.join(toFormat[3]);
}

module.exports = formatDate;
