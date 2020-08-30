'use strict';

/**
 *
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  // write code here
  const arrayOfDate = date.split(fromFormat[3]);
  const copy = arrayOfDate;
  let elementOfYear;

  for (let q = 0; q < fromFormat.length; q++) {
    if (fromFormat[q] === 'YYYY') {
      elementOfYear = q;
    } else if (fromFormat[q] === 'YY') {
      elementOfYear = q;
    }
  }

  for (let w = 0; w < toFormat.length; w++) {
    if (toFormat[w] === 'YY') {
      arrayOfDate[elementOfYear] = arrayOfDate[elementOfYear].substring(2);
    }
  }

  let joinNewDate;
  let finalDate;

  for (let i = 0; i < fromFormat.length - 1; i++) {
    for (let y = 0; y < toFormat.length - 1; y++) {
      if (fromFormat[i] === toFormat[y] && i !== y) {
        const temp = arrayOfDate[y];

        arrayOfDate[y] = copy[i];
        arrayOfDate[i] = temp;
        joinNewDate = arrayOfDate.join(' ');
        finalDate = joinNewDate.replace(/ /g, toFormat[3]);

        return finalDate;
      }
    }
  }
}

module.exports = formatDate;
