'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const arrDate = date.split(`${fromFormat[3]}`);
  const newDate = [];
  let index;

  for (let i = 0; i < 3; i++) {
    switch (toFormat[i]) {
      case 'YY':
        if (fromFormat.indexOf('YY') >= 0) {
          index = fromFormat.indexOf('YY');
          newDate[i] = arrDate[index];
        } else {
          index = fromFormat.indexOf('YYYY');
          newDate[i] = arrDate[index].slice(2);
        }
        break;

      case 'YYYY':
        if (fromFormat.indexOf('YY') >= 0) {
          index = fromFormat.indexOf('YY');

          newDate[i] = (arrDate[index] < 30)
            ? `20${arrDate[index]}`
            : `19${arrDate[index]}`;
        } else {
          index = fromFormat.indexOf('YYYY');
          newDate[i] = arrDate[index];
        }
        break;

      case 'MM':
        index = fromFormat.indexOf('MM');
        newDate[i] = arrDate[index];
        break;

      case 'DD':
        index = fromFormat.indexOf('DD');
        newDate[i] = arrDate[index];
        break;
    }
  }

  return newDate.join(`${toFormat[3]}`);
}

module.exports = formatDate;
