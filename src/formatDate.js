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
  const fromYearIndex = fromFormat.findIndex((str) => str.includes('Y'));
  const fromMonthIndex = fromFormat.findIndex((str) => str.includes('M'));
  const fromDayIndex = fromFormat.findIndex((str) => str.includes('D'));

  const toSeparator = toFormat[3];
  const toYearIndex = toFormat.findIndex((str) => str.includes('Y'));
  const toMonthIndex = toFormat.findIndex((str) => str.includes('M'));
  const toDayIndex = toFormat.findIndex((str) => str.includes('D'));

  const splittedFromDate = date.split(fromSeparator);
  const splittedToDate = [null, null, null];

  splittedToDate[toYearIndex] = formatYear(
    splittedFromDate[fromYearIndex],
    fromFormat[fromYearIndex],
    toFormat[toYearIndex],
  );
  splittedToDate[toMonthIndex] = splittedFromDate[fromMonthIndex];
  splittedToDate[toDayIndex] = splittedFromDate[fromDayIndex];

  return splittedToDate.join(toSeparator);
}

function formatYear(year, fromFormat, toFormat) {
  if (fromFormat === toFormat) {
    return year;
  }

  if (fromFormat === 'YYYY') {
    return (+year % 100).toString().padStart(2, '0');
  }

  return `${+year < 30 ? '20' : '19'}${year}`;
}

module.exports = formatDate;
