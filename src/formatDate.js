'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparate = fromFormat[3];
  const toSeparate = toFormat[3];
  const fromFormatDate = fromFormat.slice(0, 3);
  const toFormatDate = toFormat.slice(0, 3);

  const origDate = date.split(fromSeparate);
  const origDateObj = {};
  const returnDate = {};

  for (let i = 0; i < fromFormatDate.length; i++) {
    origDateObj[fromFormatDate[i]] = origDate[i];
  }

  if ('YYYY' in origDateObj) {
    origDateObj['YY'] = origDateObj['YYYY'].slice(2);
  } else if ('YY' in origDateObj) {
    origDateObj['YYYY'] =
      origDateObj['YY'] < 30
        ? `20${origDateObj['YY']}`
        : `19${origDateObj['YY']}`;
  }

  for (let i = 0; i < toFormatDate.length; i++) {
    returnDate[toFormatDate[i]] = origDateObj[toFormatDate[i]];
  }

  return Object.values(returnDate).join(toSeparate);
}

module.exports = formatDate;
