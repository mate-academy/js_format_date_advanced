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
  const datePrepared = date.split(fromFormat[fromFormat.length - 1]);
  const splitDate = {
    separator: toFormat[toFormat.length - 1],
  };

  const newDate = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    splitDate[fromFormat[i]] = datePrepared[i];

    if (fromFormat[i] === 'YY') {
      if (+datePrepared[i] >= 0 && +datePrepared[i] <= 22) {
        splitDate['YYYY'] = '20' + datePrepared[i];
      } else {
        splitDate['YYYY'] = '19' + datePrepared[i];
      }
    }

    if (fromFormat[i] === 'YYYY') {
      splitDate['YY'] = ('' + datePrepared).slice(-2);
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    newDate.push(splitDate[toFormat[i]]);
  }

  return newDate.join(splitDate.separator);
}

module.exports = formatDate;
