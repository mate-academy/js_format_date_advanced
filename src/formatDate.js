'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateObj = {};
  const indexSeparator = toFormat.length - 1;
  const arrDate = date.split(fromFormat[indexSeparator]);

  for (let i = 0; i < indexSeparator; i++) {
    dateObj[fromFormat[i]] = arrDate[i];
  }

  for (let i = 0; i < indexSeparator; i++) {
    if (dateObj.YYYY && toFormat[i] === 'YY') {
      const dateYear = dateObj.YYYY;

      delete dateObj.YYYY;
      dateObj.YY = dateYear.slice(2);
    }

    if (dateObj.YY && toFormat[i] === 'YYYY') {
      const dateYear = dateObj.YY < 30
        ? '20' + dateObj.YY
        : '19' + dateObj.YY;

      delete dateObj.YY;
      dateObj.YYYY = dateYear;
    }

    arrDate[i] = dateObj[toFormat[i]];
  }

  return arrDate.join(toFormat[indexSeparator]);
}

module.exports = formatDate;
