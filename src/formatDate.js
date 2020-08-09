'use strict';

/**
 * Time flies, standards change.
 * Let's get rid of the routine of changing the date format,
 * and create a function for formatting dates.
 * Create a `formatDate` function that accepts the `date` string,
 * the old `fromFormat` array variable,
 * and the new `toFormat` array variable.
 * Function returns given date in `toFormat` format.
 *
 * Example:
 * formatDate('2020-02-18', ['YYYY', 'MM', 'DD', '-'], ['DD', 'MM', 'YY', '/'])
 *  '18/02/20'
 * formatDate('2021-02-18', ['YYYY', 'MM', 'DD', '-'], ['DD', 'MM', 'YY', '/'])
 *  '18/02/21'
 * formatDate('97/02/18', ['YY', 'MM', 'DD', '/'], ['DD', 'MM', 'YYYY', '.'])
 *  '18.02.1997'
 *
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const newFormatDate = [];

  const oldSeparator = fromFormat[3];
  const newSeparator = toFormat[3];

  const fromF = fromFormat.slice(0, -1);
  const toF = toFormat.slice(0, -1);

  const dateArr = date.split(oldSeparator);

  for (let i = 0; i < toF.length; i++) {
    const itemIndex = fromF.indexOf(toF[i]);

    if (itemIndex === -1) {
      switch (toF[i]) {
        case 'YYYY':
          let year = dateArr[fromF.indexOf('YY')];

          if (year > 21) {
            year = 19 + year;
          }

          if (year <= 21) {
            year = 20 + year;
          }

          newFormatDate[i] = year;
          break;

        case 'YY':
          const oldYear = dateArr[fromF.indexOf('YYYY')];
          const newYear = oldYear.split('').slice(-2).join('');

          newFormatDate[i] = newYear;
          break;
      }
    } else {
      newFormatDate[i] = dateArr[itemIndex];
    }
  }

  return newFormatDate.join(newSeparator);
}

module.exports = formatDate;
