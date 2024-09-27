'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const newDate = [];
  const separator = fromFormat[3];
  const uva = date.split(separator);

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'DD') {
      newDate[i] = uva[fromFormat.indexOf('DD')];
    } else if (toFormat[i] === 'MM') {
      newDate[i] = uva[fromFormat.indexOf('MM')];
    } else {
      // newDate[i] = ... {year}
      let j = 0;

      for (j; j < 3; j++) {
        if (fromFormat[j][0] === 'Y') {
          break;
        }
      }

      if (toFormat[i] === 'YY') {
        newDate[i] = uva[j].length === 2 ? uva[j] : uva[j].substring(2, 4);
      } else {
        newDate[i] = uva[j].length === 4 ? uva[j]
          : (uva[j] < 30 ? uva[j].padStart(4, 20) : uva[j].padStart(4, 19));
      }
    }
  }

  const separator2 = toFormat[3];
  const res = newDate.join(separator2);

  return res;
}

module.exports = formatDate;
