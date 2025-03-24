'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const [d1, d2, d3, sepFrom] = fromFormat;
  const [t1, t2, t3, sepTo] = toFormat;

  const [p1, p2, p3] = date.split(sepFrom);
  const dateMap = { [d1]: p1, [d2]: p2, [d3]: p3 };

  if (dateMap.YY) {
    dateMap.YYYY = +dateMap.YY < 30 ? `20${dateMap.YY}` : `19${dateMap.YY}`;
  }

  if (dateMap.YYYY && toFormat.includes('YY')) {
    dateMap.YY = dateMap.YYYY.slice(-2);
  }

  return [dateMap[t1], dateMap[t2], dateMap[t3]].join(sepTo);
}

module.exports = formatDate;
