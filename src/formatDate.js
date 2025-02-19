'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const currentSeparator = fromFormat[fromFormat.length - 1];
  const newSeparator = toFormat[toFormat.length - 1];

  const dateInArray = date.split(currentSeparator);

  const dayIndex = fromFormat.indexOf('DD');
  const newDayIndex = toFormat.indexOf('DD');
  const day = dateInArray[dayIndex];

  const monthIndex = fromFormat.indexOf('MM');
  const newMonthIndex = toFormat.indexOf('MM');
  const month = dateInArray[monthIndex];

  let YEAR_INDEX = null;
  let NEW_YEAR_INDEX = null;
  let oldYearFormat = '';
  let newYearFormat = '';

  getYearFormatsAndIndices();

  function getYearFormatsAndIndices() {
    if (fromFormat.includes('YY')) {
      YEAR_INDEX = fromFormat.indexOf('YY');
      oldYearFormat = 'YY';
    }

    if (fromFormat.includes('YYYY')) {
      YEAR_INDEX = fromFormat.indexOf('YYYY');
      oldYearFormat = 'YYYY';
    }

    if (toFormat.includes('YY')) {
      NEW_YEAR_INDEX = toFormat.indexOf('YY');
      newYearFormat = 'YY';
    }

    if (toFormat.includes('YYYY')) {
      NEW_YEAR_INDEX = toFormat.indexOf('YYYY');
      newYearFormat = 'YYYY';
    }
  }

  const YEAR = formatYear(oldYearFormat, newYearFormat);

  function formatYear(oldFormat, newFormat) {
    const year = dateInArray[YEAR_INDEX];

    if (oldFormat === 'YYYY' && newFormat === 'YY') {
      return year.slice(-2);
    }

    if (oldFormat === 'YY' && newFormat === 'YYYY') {
      if (+year < 30) {
        return `20${year}`;
      } else {
        return `19${year}`;
      }
    }

    return year;
  }

  const newDate = Array(3);

  newDate[newDayIndex] = day;
  newDate[newMonthIndex] = month;
  newDate[NEW_YEAR_INDEX] = YEAR;

  return newDate.join(newSeparator);
}

module.exports = formatDate;
