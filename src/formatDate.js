'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const newFormat = [];
  const dateFormatArr = date.split(fromFormat[fromFormat.length - 1]);
  const separator = toFormat[toFormat.length - 1];
  const dateFormat = {
    YY: '',
    YYYY: '',
    MM: '',
    DD: '',
  };

  for (const datePart of fromFormat) {
    if (datePart in dateFormat) {
      dateFormat[datePart] = dateFormatArr[fromFormat.indexOf(datePart)];
    }
  }

  if (dateFormat['YY'] === '') {
    dateFormat['YY'] = dateFormat['YYYY'].slice(2, 4);
  }

  if (dateFormat['YYYY'] === '') {
    if (dateFormat['YY'] >= 30) {
      dateFormat['YYYY'] = `19${dateFormat['YY']}`;
    } else {
      dateFormat['YYYY'] = `20${dateFormat['YY']}`;
    }
  }

  for (let i = 0; i < 3; i++) {
    const dateToFOrmat = dateFormat[toFormat[i]];

    newFormat.push(dateToFOrmat);
  }

  return newFormat.join(separator);
}

module.exports = formatDate;
