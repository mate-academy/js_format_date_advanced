'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const newStr = date.split(fromFormat[3]);
  const res = [];
  let result = '';

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (toFormat[i] === fromFormat[j]) {
        res.push(newStr[j]);
      }

      if (toFormat[i].includes('Y')
      && fromFormat[j].includes('Y') && toFormat[i] < fromFormat[j]) {
        const a = newStr[j].slice(2);

        res.push(a);
      }

      if (toFormat[i].includes('Y')
      && fromFormat[j].includes('Y') && toFormat[i] > fromFormat[j]) {
        if (newStr[j] >= 30 && newStr[j] < 100) {
          const a = `19${newStr[j]}`;

          res.push(a);
        }

        if (newStr[j] < 30) {
          const a = `20${newStr[j]}`;

          res.push(a);
        }
      }
    }
  }

  result = res.join(toFormat[3]);

  return result;
}

module.exports = formatDate;
