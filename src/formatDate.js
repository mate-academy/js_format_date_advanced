/* eslint-disable no-unused-expressions */
'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separatorFrom = fromFormat[fromFormat.length - 1];
  const separatorTo = toFormat[toFormat.length - 1];
  const dataFormatFrom = fromFormat.slice(0, 3);
  const dataFormatTo = toFormat.slice(0, 3);
  const dataWithoutSeparator = date.split(`${separatorFrom}`);
  const dateObj = {};

  for (let i = 0; i < dataWithoutSeparator.length; i++) {
    dateObj[dataFormatFrom[i]] = dataWithoutSeparator[i];
  }

  const newDateParts = [];

  for (let i = 0; i < dataWithoutSeparator.length; i++) {
    if (dataFormatTo[i] === 'YYYY') {
      let year = dateObj['YYYY'] || dateObj['YY'];

      if (year.length === 2) {
        year < 30 ? (year = '20' + year) : (year = '19' + year);
      }
      newDateParts.push(year);
    } else if (dataFormatTo[i] === 'YY') {
      const year = (dateObj['YYYY'] || dateObj['YY']).slice(2);

      newDateParts.push(year);
    } else {
      newDateParts.push(dateObj[dataFormatTo[i]]);
    }
  }

  return newDateParts.join(separatorTo);
}

module.exports = formatDate;
