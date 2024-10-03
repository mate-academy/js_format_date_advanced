'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const fromSeparatorFormat = fromFormat[3];
  const toSeparatorFormat = toFormat[3];
  const dateObject = {};

  const arrayFromDate = date.split(fromSeparatorFormat);

  fromFormat.forEach((part, i) => {
    switch (part) {
      case 'YYYY':
        dateObject.year = arrayFromDate[i];
        break;

      case 'YY':
        const year = parseInt(arrayFromDate[i]);

        dateObject.year =
          year < 30 ? '20' + arrayFromDate[i] : '19' + arrayFromDate[i];
        break;

      case 'MM':
        dateObject.month = arrayFromDate[i];
        break;

      case 'DD':
        dateObject.day = arrayFromDate[i];
        break;

      default:
        break;
    }
  });

  const result = toFormat
    .map((part) => {
      if (part === 'YYYY') {
        return dateObject.year;
      }

      if (part === 'YY') {
        return dateObject.year.slice(-2);
      }

      if (part === 'MM') {
        return dateObject.month;
      }

      if (part === 'DD') {
        return dateObject.day;
      }
    })
    .filter(Boolean)
    .join(toSeparatorFormat);

  return result;
}

module.exports = formatDate;
