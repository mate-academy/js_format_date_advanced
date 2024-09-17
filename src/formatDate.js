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

  const arrDate = date.split(fromFormat[3]);
  const arrResult = [];

  for (let i = 0; i < toFormat.length; i++) {
    switch (toFormat[i]) {
      case 'DD':
        arrResult.push(arrDate[fromFormat.indexOf('DD')]);
        break;

      case 'MM':
        arrResult.push(arrDate[fromFormat.indexOf('MM')]);
        break;

      case 'YY':
        if (arrDate[fromFormat.indexOf('YYYY')].length > 2) {
          arrResult.push(arrDate[fromFormat.indexOf('YYYY')].slice(-2));
        } else {
          arrResult.push(arrDate[fromFormat.indexOf('YY')]);
        }
        break;

      case 'YYYY':
        if (fromFormat.indexOf('YY') !== -1) {
          if (arrDate[fromFormat.indexOf('YY')] < 30) {
            arrResult.push(`20${arrDate[fromFormat.indexOf('YY')]}`);
          } else {
            arrResult.push(`19${arrDate[fromFormat.indexOf('YY')]}`);
          }
        } else {
          arrResult.push(arrDate[fromFormat.indexOf('YYYY')]);
        }

        break;
    }
  }

  return arrResult.join(toFormat[3]);
}

module.exports = formatDate;
