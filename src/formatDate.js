'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSep = fromFormat[3];
  const toSep = toFormat[3];

  const fromA = fromFormat.slice(0, 3);
  const toA = toFormat.slice(0, 3);

  const vals = date.split(fromSep);
  const map = {};

  for (let i = 0; i < 3; i++) {
    map[fromA[i]] = vals[i];
  }

  const pad2 = (s) => String(s).padStart(2, '0');

  const getYYYY = () => {
    if (map.YYYY != null) {
      return String(map.YYYY).padStart(4, '0');
    }

    const yy = Number(map.YY);
    const yyyy = yy < 30 ? 2000 + yy : 1900 + yy;

    return String(yyyy);
  };

  const getYY = () => {
    if (map.YY != null) {
      return pad2(map.YY);
    }

    return String(getYYYY()).slice(-2);
  };

  const part = (token) => {
    if (token === 'YYYY') {
      return getYYYY();
    }

    if (token === 'YY') {
      return getYY();
    }

    if (token === 'MM') {
      return pad2(map.MM);
    }

    if (token === 'DD') {
      return pad2(map.DD);
    }

    return '';
  };

  const out = [part(toA[0]), part(toA[1]), part(toA[2])];

  return out.join(toSep);
}

module.exports = formatDate;
