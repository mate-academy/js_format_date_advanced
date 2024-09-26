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
  const splited = date.split(fromFormat[3]);
  const dateObj = {};
  const shortYearRepresentation = 'YY';
  const longYearRepresentation = 'YYYY';
  const currentCentury = '20';
  const twentiethyear = 20;
  const twentiethCentury = '19';

  for (let i = 0; i < fromFormat.length - 1; i++) {
    dateObj[fromFormat[i]] = splited[i];
  }

  if (dateObj[longYearRepresentation]) {
    dateObj[shortYearRepresentation]
      = dateObj[longYearRepresentation].substring(2);
  } else {
    let year = dateObj[shortYearRepresentation];

    year = +year > twentiethyear ? twentiethCentury + year
      : currentCentury + year;
    dateObj[longYearRepresentation] = year;
  }

  const newDateObj = {};

  for (let i = 0; i < toFormat.length - 1; i++) {
    newDateObj[toFormat[i]] = dateObj[toFormat[i]];
  }

  const newDate = Object.values(newDateObj).join(toFormat[3]);

  return newDate;
}

module.exports = formatDate;
