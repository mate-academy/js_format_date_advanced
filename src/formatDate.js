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
  const formatedDate = date.split(fromFormat[3]);
  const sliceFromFormat = fromFormat.slice(0, -1);
  const sliceToFormat = toFormat.slice(0, -1);
  const newFormatDate = {
    days: null,
    months: null,
    years: null,
    oldFormatYear: findFormatYear(sliceFromFormat),
    newFormatYear: findFormatYear(sliceToFormat),
  };

  for (let i = 0; i < sliceFromFormat.length; i++) {
    if (sliceFromFormat[i].includes('DD')) {
      newFormatDate.days = formatedDate[i];
    } else if (sliceFromFormat[i].includes('MM')) {
      newFormatDate.months = formatedDate[i];
    } else {
      newFormatDate.years = formatedDate[i];
    }
  }

  const { oldFormatYear, newFormatYear, years: year } = newFormatDate;

  if (oldFormatYear < newFormatYear) {
    if (year < 30) {
      newFormatDate.years = 20 + year.slice(0);
    } else {
      newFormatDate.years = 19 + year.slice(0);
    }
  }

  if (oldFormatYear > newFormatYear) {
    newFormatDate.years = year.slice(2);
  }

  const { days, months, years } = newFormatDate;

  for (let i = 0; i < sliceToFormat.length; i++) {
    if (sliceToFormat[i].includes('DD')) {
      formatedDate[i] = days;
    } else if (sliceToFormat[i].includes('MM')) {
      formatedDate[i] = months;
    } else {
      formatedDate[i] = years;
    }
  }

  return formatedDate.join(toFormat[3]);
}

function findFormatYear(array) {
  for (const item of array) {
    if (item.includes('YY')) {
      return item.length;
    }
  }
}

module.exports = formatDate;
