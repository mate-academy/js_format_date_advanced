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
*/

function formatDate(date, fromFormat, toFormat) {
  const separator = fromFormat[fromFormat.length - 1];
  const dateArray = date.split(separator);
  let year = '';
  let month = '';
  let day = '';
  let newYearIndex;
  let newYear = '';
  let newMonthIndex;
  let newDayIndex;

  for (let i = 0; i < fromFormat.length - 1; i++) {
    const firstSymbolOldFormat = fromFormat[i].slice(0, 1);

    switch (firstSymbolOldFormat) {
      case 'Y':
        year = dateArray[i];
        break;

      case 'M':
        month = dateArray[i];
        break;

      case 'D':
        day = dateArray[i];
        break;
    }

    const firstSymbolNewFormat = toFormat[i].slice(0, 1);

    switch (firstSymbolNewFormat) {
      case 'Y':
        newYearIndex = i;
        newYear = toFormat[i];
        break;

      case 'M':
        newMonthIndex = i;
        break;

      case 'D':
        newDayIndex = i;
        break;
    }
  }

  if (newYear.length !== year.length) {
    switch (newYear) {
      case 'YY':
        year = year.slice(-2);
        break;

      case 'YYYY':
        if (year < 30) {
          year = `20${year}`;
        } else {
          year = `19${year}`;
        }
    }
  }

  const newDate = Array(3);

  newDate[newYearIndex] = year;
  newDate[newMonthIndex] = month;
  newDate[newDayIndex] = day;

  const joiner = toFormat[toFormat.length - 1];

  return newDate.join(joiner);
}

module.exports = formatDate;
