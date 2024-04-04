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
  let dateNew = date;
  let splittedDate = dateNew.split(fromFormat[3]);

  if (fromFormat[0] === toFormat[2]) {
    splittedDate = reverseStandart(splittedDate);
  }

  if (toFormat.includes('YY')) {
    const i = fromFormat.indexOf('YYYY');

    splittedDate[i] = splittedDate[i].slice(-2);
  }

  if (fromFormat.includes('YY')) {
    const i = fromFormat.indexOf('YY');

    if (splittedDate[i] < 30) {
      splittedDate[i] = 20 + splittedDate[i];
    } else {
      splittedDate[i] = 19 + splittedDate[i];
    }
  }

  if (fromFormat.indexOf('YYYY') === 1) {
    if (toFormat.indexOf('YYYY') === 2) {
      const i = splittedDate[2];
      const j = splittedDate[0];

      splittedDate[2] = splittedDate[1];

      if (fromFormat.indexOf('MM') === 0) {
        splittedDate[1] = j;
        splittedDate[0] = i;
      } else {
        splittedDate[0] = j;
        splittedDate[1] = i;
      }
    }
  }

  dateNew = splittedDate.join(toFormat[3]);

  return dateNew;
}

function reverseStandart(splittedDate) {
  const n = splittedDate[0];

  splittedDate[0] = splittedDate[2];
  splittedDate[2] = n;

  return splittedDate;
}

module.exports = formatDate;
