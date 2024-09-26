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
  const formattedDate = [];

  for (let i = 0; i < arrDate.length; i++) {
    if (toFormat.indexOf('DD') === i) {
      formattedDate.push(arrDate[fromFormat.indexOf('DD')]);
    }

    if (toFormat.indexOf('MM') === i) {
      formattedDate.push(arrDate[fromFormat.indexOf('MM')]);
    }

    if (toFormat.indexOf('YY') === i) {
      if (fromFormat.includes('YY')) {
        formattedDate.push(arrDate[fromFormat.indexOf('YY')]);
      } else if (fromFormat.includes('YYYY')) {
        formattedDate.push(arrDate[fromFormat.indexOf('YYYY')].slice(-2));
      }
    }

    if (toFormat.indexOf('YYYY') === i) {
      if (fromFormat.includes('YYYY')) {
        formattedDate.push(arrDate[fromFormat.indexOf('YYYY')]);
      } else if (fromFormat.includes('YY')) {
        const year = arrDate[fromFormat.indexOf('YY')];

        if (year > 29) {
          formattedDate.push(`19${year}`);
        } else {
          formattedDate.push(`20${year}`);
        }
      }
    }
  }

  return formattedDate.join(toFormat[3]);
}

module.exports = formatDate;
