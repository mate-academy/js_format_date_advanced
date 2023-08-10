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
 *
 *
 *
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

const YEAR_FORMAT_YY = 'YY';
const YEAR_FORMAT_YYYY = 'YYYY';
const DAY_FORMAT = 'DD';
const MONTH_FORMAT = 'MM';
const PREVIOUS_CENTURY = '19';
const CURRENT_CENTURY = '20';
const TO_DETERMINE_CENTURY = 30;

const getPrefixYear = (yearBefore, newFormat) => {
  const yearUpdateFormat
    = newFormat.find(partDate => partDate.includes(YEAR_FORMAT_YY));

  if (yearBefore.length === yearUpdateFormat.length) {
    return yearBefore;
  }

  if (yearBefore.toString().length > yearUpdateFormat.length) {
    return yearBefore.slice(-2);
  }

  if (yearUpdateFormat.length === 4) {
    const century = yearBefore < TO_DETERMINE_CENTURY
      ? CURRENT_CENTURY
      : PREVIOUS_CENTURY;

    return century + yearBefore;
  }
};

function formatDate(date, fromFormat, toFormat) {
  const newFormatDate = [];
  const splettedOldDate = date.split(fromFormat[fromFormat.length - 1]);
  const indexYY = fromFormat
    .findIndex((partDate) =>
      partDate === YEAR_FORMAT_YY || partDate === YEAR_FORMAT_YYYY);

  const indexForMounth = fromFormat.indexOf(MONTH_FORMAT);
  const indexForDay = fromFormat.indexOf(DAY_FORMAT);

  const day = splettedOldDate[indexForDay];
  const month = splettedOldDate[indexForMounth];
  const year = splettedOldDate[indexYY];
  const separatorIndex = toFormat[toFormat.length - 1];

  for (const format of toFormat) {
    if (format === DAY_FORMAT) {
      newFormatDate.push(day);
    }

    if (format === MONTH_FORMAT) {
      newFormatDate.push(month);
    }

    if (format === YEAR_FORMAT_YY || format === YEAR_FORMAT_YYYY) {
      const yearUpdate = getPrefixYear(year, toFormat);

      newFormatDate.push(yearUpdate);
    }
  }

  return newFormatDate.join(separatorIndex);
}

module.exports = formatDate;
