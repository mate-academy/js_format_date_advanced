'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat[3];
  const toSeparator = toFormat[3];
  const initialDate = date.split(fromSeparator);
  const resultDate = [];
  const dateParts = {
    day: '',
    month: '',
    year: '',
  };

  for (let i = 0; i <= 2; i++) {
    switch (fromFormat[i]) {
      case ('YY'):
        dateParts.year = (initialDate[i] < 30)
          ? `20${initialDate[i]}`
          : `19${initialDate[i]}`;
        break;
      case ('YYYY'):
        dateParts.year = initialDate[i];
        break;

      case ('MM'):
        dateParts.month = initialDate[i];
        break;

      case ('DD'):
        dateParts.day = initialDate[i];
        break;
    }
  }

  for (let i = 0; i <= 2; i++) {
    switch (toFormat[i]) {
      case ('YY'):
        resultDate.push(dateParts.year.slice(-2));
        break;

      case ('YYYY'):
        resultDate.push(dateParts.year);
        break;

      case ('MM'):
        resultDate.push(dateParts.month);
        break;

      case ('DD'):
        resultDate.push(dateParts.day);
        break;
    }
  }

  return resultDate.join(toSeparator);
}

module.exports = formatDate;
