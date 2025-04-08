'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(dateStr, fromFormat, toFormat) {
  const fromSeparator = fromFormat[3];
  const toSeparator = toFormat[3];

  const dateParts = dateStr.split(fromSeparator);
  const partsMap = {};

  for (let i = 0; i < 3; i++) {
    partsMap[fromFormat[i]] = dateParts[i];
  }

  if (toFormat.includes('YY') && partsMap['YYYY']) {
    partsMap['YY'] = partsMap['YYYY'].slice(-2);
  }

  if (toFormat.includes('YYYY') && partsMap['YY']) {
    const yy = parseInt(partsMap['YY'], 10);

    partsMap['YYYY'] = yy < 30 ? '20' + partsMap['YY'] : '19' + partsMap['YY'];
  }

  const result = [
    partsMap[toFormat[0]],
    partsMap[toFormat[1]],
    partsMap[toFormat[2]],
  ].join(toSeparator);

  return result;
}

module.exports = formatDate;
