'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // Set the new divider type
  const newDivider = toFormat[toFormat.length - 1];

  // Split the input date into parts
  const fromDateParts = date.split(fromFormat[fromFormat.length - 1]);

  // Initialize the new date parts array
  const newDateParts = [];

  // Find the input date year, month, and day indexes
  const fromDateYearIndex =
    fromFormat.indexOf('YYYY') !== -1
      ? fromFormat.indexOf('YYYY')
      : fromFormat.indexOf('YY');
  const fromDateMonthIndex = fromFormat.indexOf('MM');
  const fromDateDayIndex = fromFormat.indexOf('DD');

  // Figure out the input date year's literal length
  const fromDateYearLength = fromDateParts[fromDateYearIndex].length;

  // Find the input date year, month, and day
  const fromDateYear = fromDateParts[fromDateYearIndex];
  const fromDateMonth = fromDateParts[fromDateMonthIndex];
  const fromDateDay = fromDateParts[fromDateDayIndex];

  // Find the output format year, month, and day indexes
  const toFormatYearIndex =
    toFormat.indexOf('YYYY') !== -1
      ? toFormat.indexOf('YYYY')
      : toFormat.indexOf('YY');
  const toFormatMonthIndex = toFormat.indexOf('MM');
  const toFormatDayIndex = toFormat.indexOf('DD');

  // Figure out the desired format year literal length
  const toFormatYearLength = toFormat[toFormatYearIndex].length;

  // Transform the year to the desired literal length
  const transformYear = (year, length) => {
    // XXXX => XX
    if (year.length === 4 && length === 2) {
      return year.slice(2);
    }

    // XX => XXXX
    if (year.length === 2 && length === 4) {
      const century = Number(year) >= 30 ? '19' : '20';

      return `${century}${year}`;
    }
  };

  // Set the new date parts
  newDateParts[toFormatYearIndex] =
    fromDateYearLength === toFormatYearLength
      ? fromDateYear
      : transformYear(fromDateYear, toFormatYearLength);
  newDateParts[toFormatMonthIndex] = fromDateMonth;
  newDateParts[toFormatDayIndex] = fromDateDay;

  // Join the new date parts with the new divider
  const newDate = newDateParts.join(newDivider);

  return newDate;
}

module.exports = formatDate;
