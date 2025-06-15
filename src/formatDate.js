'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, [...fromFormat], [...toFormat]) {
  const parts = ['YY', 'YYYY', 'MM', 'DD'];
  const fromYearFormat = fromFormat.includes('YY') ? 'YY' : 'YYYY';
  const toYearFormat = toFormat.includes('YY') ? 'YY' : 'YYYY';
  const splittedDate = date.split(fromFormat.pop());

  const dateInfo = parts.reduce((acc, part) => {
    const index = fromFormat.indexOf(part);

    acc[part] = index !== -1 ? splittedDate[index] : null;

    return acc;
  }, {});

  if (fromYearFormat !== toYearFormat) {
    if (fromYearFormat === 'YY') {
      dateInfo['YYYY'] =
        +dateInfo['YY'] < 30 ? '20' + dateInfo['YY'] : '19' + dateInfo['YY'];
    } else {
      dateInfo['YY'] = dateInfo['YYYY'].slice(-2);
    }
  }

  const separator = toFormat.pop();

  return toFormat.map((part) => dateInfo[part]).join(separator);
}

module.exports = formatDate;
