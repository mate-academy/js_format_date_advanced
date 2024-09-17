'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const DATE_SPLIT = date.split(fromFormat[3]);
  const ARR_OF_DATE = [0, 0, 0];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    let ind = toFormat.indexOf(fromFormat[i]);

    if (ind === -1) {
      ind = toFormat.indexOf('YY');

      if (ind === -1) {
        ind = toFormat.indexOf('YYYY');

        if (+DATE_SPLIT[i] < 23) {
          ARR_OF_DATE[ind] = +DATE_SPLIT[i] + 2000;
          continue;
        }
        ARR_OF_DATE[ind] = +DATE_SPLIT[i] + 1900;
        continue;
      }
      ARR_OF_DATE[ind] = DATE_SPLIT[i] % 100;
      continue;
    }

    ARR_OF_DATE[ind] = DATE_SPLIT[i];
  }

  return ARR_OF_DATE.join(toFormat[3]);
}

module.exports = formatDate;
