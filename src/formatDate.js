'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
 const arrDate = date.split(fromFormat[3]);
  const result = [];

  for (let i = 0; i < arrDate.length; i++) {
    if (toFormat.indexOf('DD') === i) {
      result.push(arrDate[fromFormat.indexOf('DD')]);
    }

    if (toFormat.indexOf('MM') === i) {
      result.push(arrDate[fromFormat.indexOf('MM')]);
    }

    if (toFormat.indexOf('YY') === i) {
      if (fromFormat.includes('YY')) {
        result.push(arrDate[fromFormat.indexOf('YY')]);
      } else if (fromFormat.includes('YYYY')) {
        result.push(arrDate[fromFormat.indexOf('YYYY')].slice(-2));
      }
    }

    if (toFormat.indexOf('YYYY') === i) {
      if (fromFormat.includes('YYYY')) {
        result.push(arrDate[fromFormat.indexOf('YYYY')]);
      } else if (fromFormat.includes('YY')) {
        const fromYear = arrDate[fromFormat.indexOf('YY')];

        if (fromYear > 29) {
          result.push(`19${fromYear}`);
        } else {
          result.push(`20${fromYear}`);
        }
      }
    }
  }

  return (result.join(toFormat[3]));
}

module.exports = formatDate;
