'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separatorFromFormat = fromFormat[3];
  const separatorToFormat = toFormat[3];

  const dateParts = date.split(separatorFromFormat);

  const dayIndex = fromFormat.indexOf('DD');
  const monthIndex = fromFormat.indexOf('MM');
  const yearIndex = fromFormat.includes('YYYY')
    ? fromFormat.indexOf('YYYY')
    : fromFormat.indexOf('YY');

  const day = dateParts[dayIndex];
  const month = dateParts[monthIndex];
  const year = dateParts[yearIndex];

  let finalYear = year;

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    const shortYear = parseInt(year);

    finalYear = shortYear < 30 ? '20' + year : '19' + year;
  } else if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    finalYear = year.slice(-2);
  }

  const result = [];

  for (const part of toFormat) {
    if (part === 'DD') {
      result.push(day);
    }

    if (part === 'MM') {
      result.push(month);
    }

    if (part === 'YYYY' || part === 'YY') {
      result.push(finalYear);
    }
  }

  const finalDate = result.join(separatorToFormat);

  return finalDate;
}
module.exports = formatDate;
