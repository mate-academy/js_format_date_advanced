'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const FROM_DATE_MARK = fromFormat[3];
  const TO_DATE_MARK = toFormat[3];

  const DATE_ARRAY = date.split(FROM_DATE_MARK);
  const FROM_DATE = {};
  const TO_DATE = {};
  let result = '';

  for (let i = 0; i <= 2; i++) {
    FROM_DATE[fromFormat[i]] = DATE_ARRAY[i];
    TO_DATE[toFormat[i]] = '';
  }

  for (const key in TO_DATE) {
    for (const fkey in FROM_DATE) {
      if (key === fkey) {
        TO_DATE[key] = FROM_DATE[fkey];
        result += TO_DATE[key] + TO_DATE_MARK;
      } else if (key === 'YY' && fkey === 'YYYY') {
        TO_DATE[key] = FROM_DATE[fkey].slice(-2);
        result += TO_DATE[key] + TO_DATE_MARK;
      } else if (key === 'YYYY' && fkey === 'YY') {
        TO_DATE[key] =
          Number(FROM_DATE[fkey]) < 30
            ? '20' + FROM_DATE[fkey]
            : '19' + FROM_DATE[fkey];

        result += TO_DATE[key] + TO_DATE_MARK;
      }
    }
  }

  result = result.slice(0, -1);

  return result;
}

module.exports = formatDate;
