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
  const fromSeparator = fromFormat[3];
  const toSeparator = toFormat[3];
  const dateParts = date.split(fromSeparator);
  const dataMap = {};

  // const [day, month, year] = dateParts;

  for (let i = 0; i < 3; i++) {
    dataMap[fromFormat[i]] = dateParts[i];
  }

  let year = dataMap['YYYY'] || dataMap['YY'];

  if (year.length === 2) {
    year = Number(year) < 30 ? '20' + year : '19' + year;
  }

  const resultParts = [];

  for (let i = 0; i < 3; i++) {
    const partType = toFormat[i];

    if (partType === 'DD') {
      resultParts.push(dataMap['DD']);
    }

    if (partType === 'MM') {
      resultParts.push(dataMap['MM']);
    }

    if (partType === 'YYYY') {
      resultParts.push(year);
    }

    if (partType === 'YY') {
      resultParts.push(year.slice(-2));
    }
  }

  return resultParts.join(toSeparator);
}

module.exports = formatDate;
