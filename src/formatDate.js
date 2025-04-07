'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const splittedOldDate = date.split(fromFormat[3]);
  const resultArray = [];
  const parsedDate = {};

  for (let i = 0; i < 3; i++) {
    parsedDate[fromFormat[i]] = splittedOldDate[i];
  }

  for (let i = 0; i < toFormat.length; i++) {
    switch (toFormat[i]) {
      case 'DD':
        resultArray.push(parsedDate[toFormat[i]]);
        break;

      case 'MM':
        resultArray.push(parsedDate[toFormat[i]]);
        break;

      case 'YYYY': {
        let year;

        if ('YY' in parsedDate) {
          year = parsedDate['YY'];

          year = +year < 30 ? '20' + year : '19' + year;
        } else {
          year = parsedDate['YYYY'];
        }

        resultArray.push(year);
        break;
      }

      case 'YY': {
        resultArray.push((parsedDate.YY || parsedDate.YYYY).slice(-2));
        break;
      }
    }
  }

  return resultArray.join(toFormat[3]);
}

module.exports = formatDate;
