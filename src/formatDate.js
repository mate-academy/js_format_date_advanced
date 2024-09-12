'use strict';

/**
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
