'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const result = [];
  const newDate = date.split(fromFormat[3]);
  const sliceFromFormat = fromFormat.slice(0, 3);
  const sliceToFormat = toFormat.slice(0, 3);

  const obj = sliceFromFormat.reduce((acc, num, idx) => {
    acc[num] = newDate[idx];

    return acc;
  }, {});

  for (const key of sliceToFormat) {
    if (key.includes('YY')) {
      let year = '';

      if (obj[key]) {
        result.push(obj[key]);

        continue;
      }

      if (key.length === 2) {
        year = obj['YYYY'].slice(-2);
      } else {
        const yearFormat = obj['YY'];

        year = +yearFormat < 30 ? `20${yearFormat}` : `19${yearFormat}`;
      }

      result.push(year);

      continue;
    }

    result.push(obj[key]);
  }

  return result.join(toFormat[3]);
}

module.exports = formatDate;
