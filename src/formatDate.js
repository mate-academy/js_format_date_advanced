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
  const CENTURY_CONDITION = 30;
  const CENTURY_VALUE_1 = '20';
  const CENTURY_VALUE_2 = '19';
  const YEAR_LONG_FORMAT = 'YYYY';
  const YEAR_SHORT_FORMAT = 'YY';
  const FIRST_PART_OF_DATE_INDEX = 0;
  const LAST_PART_OF_DATE_INDEX = 2;

  const initialSeparator = fromFormat[fromFormat.length - 1];
  const finalSeparator = toFormat[toFormat.length - 1];
  const arrFromDate = date.split(initialSeparator);
  const initiaDateObj = {};
  const resultDate = [];
  let initialYearFormat = '';

  createObjectFromInitialDate();
  createNewDataFormat();

  return resultDate.join(finalSeparator);

  function createObjectFromInitialDate() {
    for (let i = FIRST_PART_OF_DATE_INDEX; i <= LAST_PART_OF_DATE_INDEX; i++) {
      initiaDateObj[fromFormat[i]] = arrFromDate[i];

      if (fromFormat[i].includes('Y')) {
        initialYearFormat = fromFormat[i];
      }
    }
  }

  function computeCentury() {
    return initiaDateObj.YY < CENTURY_CONDITION
      ? CENTURY_VALUE_1
      : CENTURY_VALUE_2;
  }

  function createNewDataFormat() {
    for (let i = FIRST_PART_OF_DATE_INDEX; i <= LAST_PART_OF_DATE_INDEX; i++) {
      const datePart = toFormat[i];
      const centuries = computeCentury();

      if (initialYearFormat !== datePart) {
        switch (datePart) {
          case YEAR_LONG_FORMAT:
            resultDate.push(centuries + initiaDateObj.YY);
            break;

          case YEAR_SHORT_FORMAT:
            resultDate.push(initiaDateObj.YYYY.slice(2));
            break;

          default: resultDate.push(initiaDateObj[datePart]);
        }
      }

      if (initialYearFormat === datePart) {
        resultDate.push(initiaDateObj[datePart]);
      }
    }
  }
}

module.exports = formatDate;
