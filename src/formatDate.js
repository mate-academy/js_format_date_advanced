'use strict';

/**
 *   Time flies, standards change. Let's get rid of the routine of changing the
 * date format. Create a `formatDate` function that accepts the `date` string,
 * the old `fromFormat` array and the new `toFormat` array. Function returns
 * given date in new format.
 *   The function can change a separator, reorder the date parts of convert a
 * year from 4 digits to 2 digits and back.
 *   When converting from YYYY to YY just use 2 last digit (1997 -> 97).
 *   When converting from YY to YYYY use 20YY if YY < 30 and 19YY otherwise.
 *
 * Examples:
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.2020'
 *
 * formatDate(
 *   '18-02-2020',
 *   ['DD', 'MM', 'YYYY', '-'],
 *   ['DD', 'MM', 'YY', '/'],
 * ) // '18/02/20'
 *
 * formatDate(
 *   '20/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '97/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.1997'
 *
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const divider = fromFormat[fromFormat.length - 1];
  const toDivider = toFormat[toFormat.length - 1];
  const splittedComingDate = date.split(divider);

  const comingYearIndex = fromFormat.findIndex((value) => value[0] === 'Y');
  const comingMonthIndex = fromFormat.findIndex((value) => value[0] === 'M');
  const comingDayIndex = fromFormat.findIndex((value) => value[0] === 'D');

  const comingYear = splittedComingDate[comingYearIndex];
  const comingMonth = splittedComingDate[comingMonthIndex];
  const comingDay = splittedComingDate[comingDayIndex];

  let formattedDate = '';

  for (const format of toFormat) {
    switch (format[0]) {
      case 'Y':
        const comingYearLength = fromFormat[comingYearIndex].length;
        const comingFormatIsDifferent = format.length !== comingYearLength;

        if (comingFormatIsDifferent) {
          if (format.length === 4) {
            // we are here in case we have 2-digits year
            // in `date` and `fromFormat
            formattedDate += comingYear < 30 ? 20 : 19;
            formattedDate += comingYear;
            break;
          }

          // we are here in case we have 4-digits year
          // in `date` and `fromFormat
          formattedDate += comingYear.slice(2, 4);
          break;
        }

        formattedDate += comingYear;
        break;
      case 'M':
        formattedDate += comingMonth;
        break;
      case 'D':
        formattedDate += comingDay;
        break;
      default:
        break;
    }

    if (toFormat.indexOf(format) <= 1) {
      formattedDate += toDivider;
    }
  }

  return formattedDate;
}

module.exports = formatDate;
