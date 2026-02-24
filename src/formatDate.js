'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const sep = fromFormat[3];
  const parts = date.split(sep);
  const obj = Object.fromEntries(
    fromFormat.slice(0, 3).map((key, index) => [key, parts[index]]),
  );

  function toShortYear(YYYY) {
    return String(Number(YYYY) % 100).padStart(2, '0');
  }

  function toFullYear(YY) {
    const year = Number(YY);

    return year < 30 ? 2000 + year : 1900 + year;
  }

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    obj.YY = toShortYear(obj.YYYY);
  } else if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    obj.YYYY = toFullYear(obj.YY);
  }

  const resultParts = toFormat.slice(0, 3).map((key) => obj[key]);

  return resultParts.join(toFormat[3]);
}

module.exports = formatDate;
