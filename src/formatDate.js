'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const [fromY, fromM, fromD, fromSep] = fromFormat;
  const [toY, toM, toD, toSep] = toFormat;
  const [dateY, dateM, dateD] = date.split(fromSep);

  const dateParts = {};

  dateParts[fromY] = dateY;
  dateParts[fromM] = dateM;
  dateParts[fromD] = dateD;

  if (dateParts['YY']) {
    const year = Number(dateParts['YY']);

    dateParts['YYYY'] =
      year < 30 ? '20' + dateParts['YY'] : '19' + dateParts['YY'];
  }

  if (!dateParts['YY'] && dateParts['YYYY']) {
    dateParts['YY'] = dateParts['YYYY'].slice(-2);
  }

  return [dateParts[toY], dateParts[toM], dateParts[toD]].join(toSep);
}

module.exports = formatDate;
