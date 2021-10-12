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
  const dateArray = date.split(fromFormat[fromFormat.length - 1]);
  let year = '';
  let month = '';
  let day = '';
  let newYearIndex;
  let newYear = '';
  let newMonthIndex;
  let newDayIndex;

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i].startsWith('Y')) {
      year = dateArray[i];
    } else if (fromFormat[i].startsWith('M')) {
      month = dateArray[i];
    } else if (fromFormat[i].startsWith('D')) {
      day = dateArray[i];
    }

    if (toFormat[i].startsWith('Y')) {
      newYearIndex = i;
      newYear = toFormat[i];
    } else if (toFormat[i].startsWith('M')) {
      newMonthIndex = i;
    } else if (toFormat[i].startsWith('D')) {
      newDayIndex = i;
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

  return newDate.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
