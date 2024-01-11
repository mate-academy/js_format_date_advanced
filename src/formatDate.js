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
  const oldDateFormat = fromFormat.slice(0, 3);
  const oldSeparator = fromFormat[3];

  const newDateFormat = toFormat.slice(0, 3);
  const newSeparator = toFormat[3];

  const YEAR_MARK = 'Y';
  const MONTH_MARK = 'M';
  const DAY_MARK = 'D';
  const YEAR_LONG = 4;
  const YEAR_SHORT = 2;

  const splitDate = date.split(oldSeparator);

  const dateData = {
    year: {
      index: findPartIndex(newDateFormat, YEAR_MARK),
      value: splitDate[findPartIndex(oldDateFormat, YEAR_MARK)],
      pattern: newDateFormat[findPartIndex(newDateFormat, YEAR_MARK)],
    },

    month: {
      index: findPartIndex(newDateFormat, MONTH_MARK),
      value: splitDate[findPartIndex(oldDateFormat, MONTH_MARK)],
    },

    day: {
      index: findPartIndex(newDateFormat, DAY_MARK),
      value: splitDate[findPartIndex(oldDateFormat, DAY_MARK)],
    },

    dateConstructor(newDate) {
      newDate[this.year.index] = this.year.value;
      newDate[this.month.index] = this.month.value;
      newDate[this.day.index] = this.day.value;

      return newDate;
    },
  };

  switch (dateData.year.value.length) {
    case YEAR_LONG:
      if (dateData.year.pattern.length === YEAR_SHORT) {
        dateData.year.value = dateData.year.value.slice(2);
      }
      break;

    case YEAR_SHORT:
      if (dateData.year.pattern.length === YEAR_LONG) {
        dateData.year.value = +dateData.year.value < 30
          ? '20' + dateData.year.value
          : '19' + dateData.year.value;
      }
      break;
  }

  return dateData.dateConstructor([]).join(newSeparator);
}

function findPartIndex(array, part) {
  return array.findIndex((el) => el.includes(part));
}

module.exports = formatDate;
