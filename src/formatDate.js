'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateArray = date.split(fromFormat[fromFormat.length - 1]);
  const separator = toFormat[toFormat.length - 1];
  let formattedDate = '';

  const dateObj = {
    DD: '',
    MM: '',
    YY: '',
    YYYY: '',
  };

  for (const datePart of fromFormat) {
    if (datePart in dateObj) {
      dateObj[datePart] = dateArray[fromFormat.indexOf(datePart)];
    }
  }

  if (dateObj['YY'] === '') {
    dateObj['YY'] = dateObj['YYYY'].slice(2);
  } else {
    if (Number(dateObj['YY']) < 30) {
      dateObj['YYYY'] = '20' + dateObj['YY'];
    } else {
      dateObj['YYYY'] = '19' + dateObj['YY'];
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (i !== toFormat.length - 2) {
      formattedDate += dateObj[toFormat[i]] + separator;
    } else {
      formattedDate += dateObj[toFormat[i]];
    }
  }

  return formattedDate;
}

module.exports = formatDate;
