'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  let separator = fromFormat[3];
  const splittedDate = date.split(separator);
  const objDate = {};
  const formattedDate = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    const initDate = splittedDate[i];

    if (fromFormat[i] === 'YY') {
      if (initDate >= 30) {
        objDate['YYYY'] = '19' + initDate;
      } else {
        objDate['YYYY'] = '20' + initDate;
      }
    }

    objDate[fromFormat[i]] = initDate;
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'YY') {
      formattedDate.push(objDate['YYYY'].slice(2));
    } else {
      formattedDate.push(objDate[toFormat[i]]);
    }
  }
  separator = toFormat[3];

  return formattedDate.join(separator);
}

module.exports = formatDate;
