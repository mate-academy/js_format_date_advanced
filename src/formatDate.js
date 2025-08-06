'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const arrayOld = date.split(fromFormat[3]);
  const correctForm = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    let index = fromFormat.indexOf(toFormat[i]);

    if (index === -1) {
      if (toFormat[i] === 'YY') {
        index = fromFormat.indexOf('YYYY');
      } else if (toFormat[i] === 'YYYY') {
        index = fromFormat.indexOf('YY');
      }
    }

    if (fromFormat[index] !== 'YY' && fromFormat[index] !== 'YYYY') {
      correctForm.push(arrayOld[index]);
    } else {
      if (fromFormat[index] === 'YY' && toFormat.includes('YY')) {
        correctForm.push(arrayOld[index]);
      } else if (fromFormat[index] === 'YY' && !toFormat.includes('YY')) {
        const year = Number(arrayOld[index]);
        const fullYear = year >= 30 ? 1900 + year : 2000 + year;

        correctForm.push(fullYear);
      } else if (fromFormat[index] === 'YYYY' && toFormat.includes('YY')) {
        const year = Number(arrayOld[index]);
        const shortYear = String(year).slice(-2);

        correctForm.push(shortYear);
      } else {
        correctForm.push(arrayOld[index]);
      }
    }
  }

  return correctForm.join(toFormat[3]);
}

module.exports = formatDate;
