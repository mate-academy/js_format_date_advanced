'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separator = fromFormat[3];
  const newSeparator = toFormat[3];

  const parts = date.split(separator);

  const getIndex = (incomeString, longYear, shortYear) =>
    incomeString.indexOf(longYear) !== -1
      ? incomeString.indexOf(longYear)
      : incomeString.indexOf(shortYear);

  const yearIndex = getIndex(fromFormat, 'YYYY', 'YY');
  const newYearIndex = getIndex(toFormat, 'YYYY', 'YY');
  const monthIndex = fromFormat.indexOf('MM');
  const newMonthIndex = toFormat.indexOf('MM');
  const dayIndex = fromFormat.indexOf('DD');
  const newDayIndex = toFormat.indexOf('DD');

  const result = [];

  // --- Year conversion ---
  const fromYear = parts[yearIndex];
  const fromYearIncome = fromFormat[yearIndex];
  const toYearIncome = toFormat[newYearIndex];

  let convertedYear = fromYear;

  if (fromYearIncome === 'YYYY' && toYearIncome === 'YY') {
    convertedYear = fromYear.slice(-2);
  } else if (fromYearIncome === 'YY' && toYearIncome === 'YYYY') {
    const num = parseInt(fromYear, 10);

    convertedYear = (num < 30 ? 2000 + num : 1900 + num).toString();
  }

  result[newYearIndex] = convertedYear;
  result[newMonthIndex] = parts[monthIndex].padStart(2, '0');
  result[newDayIndex] = parts[dayIndex].padStart(2, '0');

  return result.join(newSeparator);
}

module.exports = formatDate;
