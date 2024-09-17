'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldDate = date.split(fromFormat[fromFormat.length - 1]);
  const res = [];

  for (const key of fromFormat) {
    const keyIndex = fromFormat.indexOf(key);

    for (const value of toFormat) {
      const valueIndex = toFormat.indexOf(value);
      const dateOld = oldDate[keyIndex];

      switch (key) {
        case value:
          res[valueIndex] = dateOld;
          break;
        case 'YY':

          if (value === 'YYYY') {
            res[valueIndex] = dateOld < 30 ? `20${dateOld}` : `19${dateOld}`;
          }

          break;
        case 'YYYY':

          if (value === 'YY') {
            res[valueIndex] = dateOld.slice(2, 4);
          }

          break;
      }
    }
  }

  return res.slice(0, 3).join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
