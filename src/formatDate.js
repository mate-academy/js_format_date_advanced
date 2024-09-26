'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldDate = date.split(fromFormat[3]);
  const newDate = [];

  for (let i = 0; i < oldDate.length; i++) {
    switch (toFormat[i]) {
      case 'DD':
        newDate.push(oldDate[fromFormat.indexOf('DD')]);
        break;

      case 'MM':
        newDate.push(oldDate[fromFormat.indexOf('MM')]);
        break;

      case 'YY':
        if (fromFormat.includes('YY')) {
          newDate.push(oldDate[fromFormat.indexOf('YY')]);
        } else {
          newDate.push(oldDate[fromFormat.indexOf('YYYY')].slice(2));
        }
        break;

      case 'YYYY':
        if (fromFormat.includes('YYYY')) {
          newDate.push(oldDate[fromFormat.indexOf('YYYY')]);
        } else {
          if (+oldDate[fromFormat.indexOf('YY')] > 20) {
            newDate.push('19' + oldDate[fromFormat.indexOf('YY')]);
          } else {
            newDate.push('20' + oldDate[fromFormat.indexOf('YY')]);
          }
        }
    }
  }

  return newDate.join(toFormat[3]);
}

module.exports = formatDate;
