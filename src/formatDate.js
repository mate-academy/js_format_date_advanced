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

  const newDate = [];
  const newDateObject = {};

  const oldDateArray = date.split(oldSeparator);

  for (let i = 0; i < oldDateArray.length; i++) {
    if (fromFormat[i] === 'YY') {
      newDateObject['YYYY'] = translateYear(oldDateArray[i]);
    } else if (fromFormat[i] === 'YYYY') {
      newDateObject['YY'] = translateYear(oldDateArray[i]);
    }

    newDateObject[fromFormat[i]] = oldDateArray[i];
  }

  function translateYear(year) {
    if (year.length === 4) {
      return year.slice(2);
    } else if (year.length === 2) {
      if (year < 30) {
        return '20' + year;
      } else {
        return '19' + year;
      }
    }
  }

  for (let i = 0; i < 3; i++) {
    newDate.push(newDateObject[toFormat[i]]);
  }

  return newDate.join(newSeparator);
}

module.exports = formatDate;
