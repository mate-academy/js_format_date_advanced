'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 *
 */
function formatYear(yearFrom, toYearFormat) {
  const YEAR_SHORT_TYPE = 'YY';
  const YEAR_LONG_TYPE = 'YYYY';
  const LAST_CENTURY = '19';
  const CURRENT_CENTURY = '20';
  const YEAR_CONDITION = 30;

  if (toYearFormat === YEAR_SHORT_TYPE) {
    const newYear = yearFrom.slice(2);

    return newYear;
  }

  if (toYearFormat === YEAR_LONG_TYPE) {
    const newYear =
      yearFrom < YEAR_CONDITION
        ? CURRENT_CENTURY + yearFrom
        : LAST_CENTURY + yearFrom;

    return newYear;
  }
}

function formatDate(date, fromFormat, toFormat) {
  const fromFormatCopy = [...fromFormat];
  const toFormatCopy = [...toFormat];
  const YEAR_SHORT_TYPE = 'YY';
  const YEAR_LONG_TYPE = 'YYYY';
  const newDate = [];
  const oldSeparator = fromFormatCopy.pop();
  const newSeparator = toFormatCopy.pop();
  const dateArr = date.split(oldSeparator);

  for (const data of toFormatCopy) {
    const index = fromFormatCopy.indexOf(data);

    if (index === -1) {
      const indexYear = Math.max(
        fromFormatCopy.indexOf(YEAR_SHORT_TYPE),
        fromFormatCopy.indexOf(YEAR_LONG_TYPE),
      );

      const year = formatYear(dateArr[indexYear], data);

      newDate.push(year);
    } else {
      newDate.push(dateArr[index]);
    }
  }

  return newDate.join(newSeparator);
}

module.exports = formatDate;
