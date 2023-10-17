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
const getStartOfYear = (year) => {
  const currentYear = new Date().getFullYear().toString();
  const shortenYear = currentYear.slice(2);
  const startOfYear = currentYear.slice(0, 2);

  return year <= shortenYear ? startOfYear : startOfYear - 1;
};

const formatYear = (year, fromFormat, toFormat) => {
  if (toFormat.length < fromFormat.length) {
    return year.slice(2);
  }

  if (toFormat.length > fromFormat.length) {
    return getStartOfYear(year) + year;
  }

  return year;
};

function formatDate(date, fromFormat, toFormat) {
  const separatorFromFormat = fromFormat[3];
  const separatorToFormat = toFormat[3];

  const dateItems = date.split(separatorFromFormat);

  return toFormat
    .slice(0, 3)
    .map((format) => {
      const index = fromFormat.indexOf(format);

      if (index === -1) {
        const fullYear = 'YYYY';
        const shortYear = 'YY';

        const yearFormat = format.length === 2 ? fullYear : shortYear;
        const yearIndex = fromFormat.indexOf(yearFormat);

        return formatYear(dateItems[yearIndex], yearFormat, format);
      }

      return dateItems[index];
    })
    .join(separatorToFormat);
}

module.exports = formatDate;
