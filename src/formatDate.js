'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const fromSep = fromFormat[fromFormat.length - 1];
  const toSep = toFormat[toFormat.length - 1];

  const fromParts = fromFormat.slice(0, 3);
  const toParts = toFormat.slice(0, 3);

  const dateParts = date.split(fromSep);

  const map = {};

  for (let i = 0; i < fromParts.length; i++) {
    map[fromParts[i]] = dateParts[i];
  }

  let yearYYYY;
  let yearYY;

  if (map.YYYY !== undefined) {
    yearYYYY = map.YYYY;
    yearYY = yearYYYY.slice(2);
  } else {
    yearYY = map.YY;

    const yyNum = Number(yearYY);

    yearYYYY = (yyNum < 30 ? '20' : '19') + yearYY;
  }

  const month = map.MM;
  const day = map.DD;

  function getValue(token) {
    if (token === 'DD') {
      return day;
    }

    if (token === 'MM') {
      return month;
    }

    if (token === 'YYYY') {
      return yearYYYY;
    }

    if (token === 'YY') {
      return yearYY;
    }

    return '';
  }

  return `${getValue(toParts[0])}${toSep}${getValue(toParts[1])}${toSep}${getValue(toParts[2])}`;
}

module.exports = formatDate;
