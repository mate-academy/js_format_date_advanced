'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separator = fromFormat[3];
  const dateList = date.split(separator);

  const parts = {};

  for (let i = 0; i < 3; i++) {
    parts[fromFormat[i]] = dateList[i];
  }

  const year = parts['YYYY'] || parts['YY'];
  const month = parts['MM'];
  const day = parts['DD'];

  const toSep = toFormat[3];
  let outYear;

  if (toFormat.includes('YYYY')) {
    if (year.length === 2) {
      outYear = Number(year) >= 30 ? `19${year}` : `20${year}`;
    } else {
      outYear = year;
    }
  } else {
    outYear = year.slice(-2);
  }

  const valueMap = {
    MM: month,
    DD: day,
    YYYY: outYear,
    YY: outYear,
  };

  return [
    valueMap[toFormat[0]],
    valueMap[toFormat[1]],
    valueMap[toFormat[2]],
  ].join(toSep);
}

module.exports = formatDate;
