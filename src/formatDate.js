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
  const result = [undefined, undefined, undefined];
  const oldDate = date.split(fromFormat[3]); // масив з частинами дати

  for (let i = 0; i < 3; i++) {
    const part = fromFormat[i];

    if (fromFormat.includes(part) && toFormat.includes(part)) {
      result[toFormat.indexOf(part)] = oldDate[i];
    }

    if (!toFormat.includes(part) && part === 'YY') {
      if (oldDate[i] < 30) {
        result[toFormat.indexOf('YYYY')] = '20' + oldDate[i];
      }

      if (oldDate[i] >= 30) {
        result[toFormat.indexOf('YYYY')] = '19' + oldDate[i];
      }
    }

    if (part === 'YYYY' && !toFormat.includes(part)) {
      const year = oldDate[i].split('').splice(2).join('');

      result[toFormat.indexOf('YY')] = year;
    }
  }

  return result.join(toFormat[3]);
}

module.exports = formatDate;
