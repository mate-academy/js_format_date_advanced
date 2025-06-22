'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldArrayDate = date.split(fromFormat.at(-1));
  const newArrayDate = [];

  for (let i = 0; i < 3; i++) {
    if (toFormat[i].slice(-2) === 'YY') {
      if (
        (toFormat[i].length === 4 && fromFormat.includes('YYYY')) ||
        (toFormat[i].length === 2 && fromFormat.includes('YY'))
      ) {
        newArrayDate.push(oldArrayDate[fromFormat.indexOf(toFormat[i])]);
      }

      if (toFormat[i].length === 2 && fromFormat.includes('YYYY')) {
        newArrayDate.push(oldArrayDate[fromFormat.indexOf('YYYY')].slice(-2));
      }

      if (toFormat[i].length === 4 && fromFormat.includes('YY')) {
        if (+oldArrayDate[fromFormat.indexOf('YY')] < 30) {
          newArrayDate.push(+oldArrayDate[fromFormat.indexOf('YY')] + 2000);
        } else {
          newArrayDate.push(+oldArrayDate[fromFormat.indexOf('YY')] + 1900);
        }
      }
    } else {
      newArrayDate.push(oldArrayDate[fromFormat.indexOf(toFormat[i])]);
    }
  }

  return newArrayDate.join(toFormat.at(-1));
}

module.exports = formatDate;
