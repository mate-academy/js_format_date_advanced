'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateToArr = date.split(fromFormat[3]);
  const dateObject = {};
  const newFormatOfDate = [];
  let newFormatOfDateToReturn = '';
  const LONG_FORMAT = 'YYYY';
  const SHORT_FORMAT = 'YY';
  let year = '';

  fromFormat.forEach((el, i) => {
    if (i < 3) {
      dateObject[el] = dateToArr[i];
    } else {
      dateObject.separator = el;
    }
  });

  for (let i = 0; i < toFormat.length - 1; i++) {
    const curentValue = toFormat[i];

    if (curentValue in dateObject) {
      newFormatOfDate.push(dateObject[curentValue]);
    } else {
      if (toFormat[i] === SHORT_FORMAT) {
        year = dateObject[LONG_FORMAT].slice(2);
      } else {
        year = (dateObject[SHORT_FORMAT] < 30)
          ? '20' + dateObject[SHORT_FORMAT]
          : '19' + dateObject[SHORT_FORMAT];
      }
      newFormatOfDate.push(year);
    }
  }

  newFormatOfDateToReturn = newFormatOfDate.join(toFormat[3]);

  return newFormatOfDateToReturn;
}

module.exports = formatDate;
