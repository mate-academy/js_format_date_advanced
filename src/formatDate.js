'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat[3];
  const toSeparator = toFormat[3];

  const fromParts = date.split(fromSeparator);
  const fromFormatObj = fromFormat.reduce((acc, part, idx) => {
    if (part !== fromSeparator) {
      acc[part] = fromParts[idx];
    }
    return acc;
  }, {});

  if (fromFormatObj['YY'] && !fromFormatObj['YYYY']) {
    fromFormatObj['YYYY'] = fromFormatObj['YY'] < 30 ? '20' + fromFormatObj['YY'] : '19' + fromFormatObj['YY'];
  }

  if (fromFormatObj['YYYY'] && !fromFormatObj['YY']) {
    fromFormatObj['YY'] = fromFormatObj['YYYY'].slice(-2);
  }

  const toParts = toFormat.map(part => fromFormatObj[part] || part);
  return toParts.join('');
}

module.exports = formatDate;
