'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const sep = fromFormat[fromFormat.length - 1];
  const parts = date.split(sep);
  const map = {};
  const sepTo = toFormat[toFormat.length - 1];
  const resultParts = [];

  if (parts.length !== 3) {
    return date;
  }

  function pad2(x) {
    const s = String(x);

    return s.length === 1 ? '0' + s : s;
  }

  function convertFromYY(yy) {
    const yy2 = pad2(yy);
    const n = Number(yy2);

    return (n < 30 ? '20' : '19') + yy2;
  }

  for (let i = 0; i < 3; i++) {
    const key = fromFormat[i];

    map[key] = parts[i];
  }

  for (let i = 0; i < 3; i++) {
    const key = toFormat[i];
    let value;

    if (key === 'YYYY') {
      if (map.YYYY) {
        value = map.YYYY;
      } else {
        value = convertFromYY(map.YY);
      }
    }

    if (key === 'YY') {
      if (map.YYYY) {
        value = map.YYYY.slice(-2);
      } else if (map.YY) {
        value = pad2(map.YY);
      }
    }

    if (key === 'MM' || key === 'DD') {
      value = pad2(map[key]);
    }
    resultParts.push(value);
  }

  return resultParts.join(sepTo);
}

module.exports = formatDate;
