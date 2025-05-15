'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const splitDate = date.split(fromFormat[3]);
  const slToFormat = toFormat.slice(0, 3);
  const day = splitDate[fromFormat.indexOf('DD')];
  const month = splitDate[fromFormat.indexOf('MM')];
  const yearLong = splitDate[fromFormat.indexOf('YYYY')];
  const yearShort = splitDate[fromFormat.indexOf('YY')] || yearLong.slice(-2);
  const separator = toFormat[3];
  const dateParts = {
    DD: day,
    MM: month,
    YYYY: yearLong,
    YY: yearShort,
  };

  for (let i = 0; i < slToFormat.length; i++) {
    if (fromFormat.indexOf('YYYY') === -1) {
      if (slToFormat[i] === 'YYYY' && Number(yearShort) < 30) {
        dateParts[slToFormat[i]] = '20' + yearShort;
      }

      if (slToFormat[i] === 'YYYY' && Number(yearShort) >= 30) {
        dateParts[slToFormat[i]] = '19' + yearShort;
      }
    }
    slToFormat[i] = dateParts[slToFormat[i]];
  }

  return slToFormat.join(separator);
}
module.exports = formatDate;
