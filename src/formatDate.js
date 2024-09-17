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
  const oldDateArray = date.split(fromFormat[fromFormat.length - 1]);
  const newDateArray = new Array(3);

  for (const i of ['D', 'Y', 'M']) {
    newDateArray[toFormat.findIndex((element) => element.includes(i))] =
      oldDateArray[
        fromFormat.findIndex((element) => element.includes(i))
      ].slice(-2);
  }

  // Avoid many calls of (element => element.includes('Y'))
  const aux = toFormat.findIndex((element) => element.includes('Y'));

  if (toFormat[aux].length > 2) {
    newDateArray[aux] =
      (newDateArray[aux] > 29 ? '19' : '20') + newDateArray[aux];
  }

  return newDateArray.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
