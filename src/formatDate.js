'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // write code here
  const arrDate = date.split(fromFormat.at(-1));
  const parts = {};
  const resArr = [];

  for (let i = 0; i < arrDate.length; i++) {
    parts[fromFormat[i]] = arrDate[i];
  }

  for (let j = 0; j < toFormat.length - 1; j++) {
    if (
      (fromFormat.includes('YYYY') && toFormat[j] === 'YY') ||
      (fromFormat.includes('YY') && toFormat[j] === 'YYYY')
    ) {
      const changedYear = normalizeYear(parts, toFormat[j]);

      resArr.push(changedYear);
      continue;
    }

    resArr.push(parts[toFormat[j]]);
  }

  return resArr.join(toFormat.at(-1));
}

function normalizeYear(obj, targetYearFormat) {
  if (targetYearFormat !== 'YY' && targetYearFormat !== 'YYYY') {
    throw new Error('Unsupported year format');
  }

  if (targetYearFormat === 'YYYY') {
    return obj.YY >= 30 ? '19' + obj.YY : '20' + obj.YY;
  }

  if (targetYearFormat === 'YY') {
    return obj.YYYY.slice(-2);
  }
}

module.exports = formatDate;
