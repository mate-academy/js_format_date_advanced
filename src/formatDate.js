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
  const separator = fromFormat[fromFormat.length - 1];
  const joiner = toFormat[toFormat.length - 1];
  const partDate = date.split(separator);
  const mainObject = {};

  for (let i = 0; i < partDate.length; i++) {
    const inForm = fromFormat[i];

    mainObject[inForm] = partDate[i];
  }

  if (mainObject['YY'] === undefined) {
    mainObject['YY'] = mainObject['YYYY'].slice(2);
  }

  if (mainObject['YYYY'] === undefined) {
    if (mainObject['YY'] < 30) {
      mainObject['YYYY'] = `20${mainObject['YY']}`;
    } else {
      mainObject['YYYY'] = `19${mainObject['YY']}`;
    }
  }

  return [
    mainObject[toFormat[0]],
    mainObject[toFormat[1]],
    mainObject[toFormat[2]],
  ].join(joiner);
}

module.exports = formatDate;
