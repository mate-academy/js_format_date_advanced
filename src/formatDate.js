'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const signFrom = fromFormat[3];
  const signTo = toFormat[3];
  const dateArr = date.split(signFrom);
  const partsDate = [];

  const yearIndex = fromFormat.includes('YYYY')
    ? fromFormat.indexOf('YYYY')
    : fromFormat.indexOf('YY');

  for (const index of toFormat) {
    if (index === 'YYYY') {
      const year = dateArr[yearIndex];

      partsDate.push(formatYear(year));
    } else if (index === 'YY') {
      const year = dateArr[yearIndex];

      partsDate.push(formatYear(year));
    } else {
      partsDate.push(dateArr[fromFormat.indexOf(index)]);
    }
  }

  return partsDate.slice(0, 3).join(signTo);

  function formatYear(year) {
    if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
      return year < 30 ? `20${year}` : `19${year}`;
    } else if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
      return year.slice(2);
    } else {
      return year;
    }
  }
}

module.exports = formatDate;
