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
  const resultArray = [];
  const oldSeparator = fromFormat[3];
  const newSeparator = toFormat[3];
  const arrDate = date.split(oldSeparator);

  for (let i = 0; i < fromFormat.length - 1; i++) {
    switch (fromFormat[i]) {
      case 'YYYY':
      case 'YY':
        dateObj.year = arrDate[i];
        break;

      case 'DD':
        dateObj.day = arrDate[i];
        break;

      case 'MM':
        dateObj.month = arrDate[i];
        break;
    }
  }

  for (let a = 0; a < toFormat.length - 1; a++) {
    switch (toFormat[a]) {
      case 'YYYY':
        if (dateObj.year.length === 4) {
          resultArray.push(dateObj.year);
        } else if (dateObj.year < 30) {
          resultArray.push(`20${dateObj.year}`);
        } else {
          resultArray.push(`19${dateObj.year}`);
        }
        break;

      case 'YY':
        if (dateObj.year.length === 2) {
          resultArray.push(dateObj.year);
        }
        resultArray.push(dateObj.year.toString().slice(2));

        break;

      case 'DD':
        resultArray.push(dateObj.day);
        break;

      case 'MM':
        resultArray.push(dateObj.month);
        break;
    }
  }

  return (resultArray.join(newSeparator));
}

module.exports = formatDate;
