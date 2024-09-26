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
  let dateArr = [];

  dateArr = date.split(fromFormat[3]);

  for (let i = 0; i < fromFormat.length; i++) {
    switch (true) {
      case (fromFormat[i] === 'YY' && !toFormat.includes('YY')):
        fromFormat[i] = 'YYYY';

        if (dateArr[i] < 30) {
          dateArr[i] = '20' + dateArr[i];
        } else {
          dateArr[i] = '19' + dateArr[i];
        }
        break;

      case (fromFormat[i] === 'YYYY' && !toFormat.includes('YYYY')):
        fromFormat[i] = 'YY';

        dateArr[i] = dateArr[i].slice(2);
        break;
    }
  }

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i] !== toFormat[i]) {
      if (fromFormat[i] !== toFormat[i]) {
        const j = toFormat.indexOf(fromFormat[i]);

        if (j !== -1) {
          const tempFormatVal = fromFormat[i];

          fromFormat[i] = fromFormat[j];

          fromFormat[j] = tempFormatVal;

          const tempDateVal = dateArr[i];

          dateArr[i] = dateArr[j];

          dateArr[j] = tempDateVal;
        }
      }
    }
  }

  return dateArr.join(toFormat[3]);
}

module.exports = formatDate;
