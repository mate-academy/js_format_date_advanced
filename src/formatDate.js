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

  let oldYear = '';

  if (fromFormat.includes('YY')) {
    oldYear = oldDate[fromFormat.indexOf('YY')];
  } else {
    oldYear = oldDate[fromFormat.indexOf('YYYY')];
  }

  for (const part of toFormat) {
    switch (part) {
      case 'DD':
        newDate.push(oldDate[fromFormat.indexOf('DD')]);
        break;

      case 'MM':
        newDate.push(oldDate[fromFormat.indexOf('MM')]);
        break;

      case 'YY':
        if (oldYear.length === 2) {
          newDate.push(oldYear);
        } else {
          newDate.push(oldYear.slice(2));
        }
        break;

      case 'YYYY':
        if (oldYear.length === 4) {
          newDate.push(oldYear);
        } else {
          if (+oldYear < 30) {
            newDate.push('20' + oldYear);
          } else {
            newDate.push('19' + oldYear);
          }
        }
        break;

      default:
        break;
    }
  }

  return newDate.join(toFormat[3]);
}

module.exports = formatDate;

formatDate('20/02/18', ['YY', 'MM', 'DD', '/'], ['YYYY', 'MM', 'DD', '.']);
