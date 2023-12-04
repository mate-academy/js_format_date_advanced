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
  // write code here
  class MyOwnDate {
      #year;

      set year(year) {
        if (year < 100) {
          this.#year = year < 30 ? '20' + year : '19' + year;
        } else {
          this.#year = year;
        }
      }

      get year() {
        return this.#year;
      }

      setDateFromFormat(dateString, format) {
        const separator = format[3];
        const dateArray = dateString.split(separator);

        for (let i = 2; i >= 0; i--) {
          const dateName = format[i];

          switch (dateName[0]) {
            case 'D':
              this.day = dateArray.pop();
              break;

            case 'M':
              this.month = dateArray.pop();
              break;

            case 'Y':
              this.year = dateArray.pop();
              break;

            default:
              throw new Error('Unexpected format');
          }
        }
      }

      getDateStringWithFormat(format) {
        const separator = format[3];
        const dateArray = [];

        for (let i = 0; i < 3; i++) {
          const dateName = format[i];

          switch (dateName[0]) {
            case 'D':
              dateArray.push(this.day);
              break;

            case 'M':
              dateArray.push(this.month);
              break;

            case 'Y':
              if (dateName.length === 2) {
                dateArray.push(this.year % 100);
              } else {
                dateArray.push(this.year);
              }
              break;

            default:
              throw new Error('Unexpected format');
          }
        }

        return dateArray.join(separator);
      }
  }

  const dateFromParam = new MyOwnDate();

  dateFromParam.setDateFromFormat(date, fromFormat);

  return dateFromParam.getDateStringWithFormat(toFormat);
}

module.exports = formatDate;
