'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const [, , , separatorNew] = toFormat;
  const [, , , separatorOld] = fromFormat;
  const copyData = date.split(separatorOld);

  const format = {};

  format[fromFormat[0]] = copyData[0];
  format[fromFormat[1]] = copyData[1];
  format[fromFormat[2]] = copyData[2];

  if (toFormat.includes('YY') && !format.hasOwnProperty('YY')) {
    format.YY = format.YYYY.slice(2);
  }

  if (toFormat.includes('YYYY') && !format.hasOwnProperty('YYYY')) {
    format.YYYY = +format.YY > 20
      ? '19' + format.YY : '20' + format.YY;
  }

  const result = [
    format[toFormat[0]],
    format[toFormat[1]],
    format[toFormat[2]],
  ].join(separatorNew);

  return result;
}

module.exports = formatDate;
