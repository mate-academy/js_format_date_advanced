'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const changeElement = toFormat[toFormat.length - 1];
  const parts = date.split(baseElement);

  const fromDay = fromFormat.indexOf('DD');
  const fromMonth = fromFormat.indexOf('MM');

  const fromYearIndex = fromFormat.includes('YYYY')
    ? fromFormat.indexOf('YYYY')
    : fromFormat.indexOf('YY');

  const day = parts[fromDay];
  const month = parts[fromMonth];
  let year = parts[fromYearIndex];

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    year = year.slice(2);
  }

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    year = Number(year) < 30 ? `20${year}` : `19${year}`;
  }

  const result = [];

  for (const element of toFormat.slice(0, 3)) {
    if (element === 'DD') {
      result.push(day);
    }

    if (element === 'MM') {
      result.push(month);
    }

    if (element === 'YY' || element === 'YYYY') {
      result.push(year);
    }
  }

  return result.join(changeElement);
}

module.exports = formatDate;
