'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldSeparator = fromFormat[3];
  const newSeparator = toFormat[3];
  const parts = date.split(oldSeparator);
  const day = parts[fromFormat.indexOf('DD')];
  const month = parts[fromFormat.indexOf('MM')];

  const newDate = [];

  for (let i = 0; i < parts.length; i++) {
    switch (toFormat[i]) {
      case 'DD':
        newDate.push(day);
        break;

      case 'MM':
        newDate.push(month);
        break;

      case 'YY':
        if (fromFormat.includes('YY')) {
          newDate.push(parts[fromFormat.indexOf('YY')]);
        } else {
          newDate.push(parts[fromFormat.indexOf('YYYY')].slice(2));
        }
        break;

      case 'YYYY':
        if (fromFormat.includes('YYYY')) {
          newDate.push(parts[fromFormat.indexOf('YYYY')]);
        } else {
          if (+parts[fromFormat.indexOf('YY')] >= 30) {
            newDate.push('19' + parts[fromFormat.indexOf('YY')]);
          } else {
            newDate.push('20' + parts[fromFormat.indexOf('YY')]);
          }
        }
        break;
    }
  }

  return newDate.join(newSeparator);
}

module.exports = formatDate;
