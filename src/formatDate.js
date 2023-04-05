'use strict';
/* eslint-disable no-console */
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
  const inputSeparator = fromFormat[fromFormat.length - 1];
  const inputDateComponents = date.split(inputSeparator);

  const outputSeparator = toFormat[toFormat.length - 1];
  const outputDateComponents = [];

  const dateComponents = {
    day: '',
    month: '',
    year: '',
    yearFormat: '',
    dateFactory() {
      for (let i = 0; i < fromFormat.length - 1; i++) {
        switch (fromFormat[i]) {
          case 'DD':
            this.day = inputDateComponents[i];
            break;
          case 'MM':
            this.month = inputDateComponents[i];
            break;
          case 'YY':
          case 'YYYY':
            this.year = inputDateComponents[i];
            this.yearFormat = fromFormat[i];
            break;
          default:
            console.error(`Wrong format: ${fromFormat[i]}`);
        }
      }
    },
    formatFactory() {
      for (let i = 0; i < toFormat.length - 1; i++) {
        const currentFormat = toFormat[i];

        switch (currentFormat) {
          case 'DD':
            outputDateComponents.push(this.day);
            break;
          case 'MM':
            outputDateComponents.push(this.month);
            break;
          case 'YY':
          case 'YYYY':
            const outputYear = this.convertYearFormat(
              this.year,
              this.yearFormat,
              currentFormat
            );

            outputDateComponents.push(outputYear);
            break;
          default:
            console.error(`Wrong format: ${currentFormat}`);
        }
      }
    },
    convertYearFormat(year, previousFormat, targetFormat) {
      if (previousFormat === targetFormat) {
        return year;
      }

      if (targetFormat === 'YY') {
        return year.slice(-2);
      }

      const prefix = year < 30 ? '20' : '19';

      return prefix + year;
    },
  };

  dateComponents.dateFactory();
  dateComponents.formatFactory();

  return outputDateComponents.join(outputSeparator);
}

module.exports = formatDate;
