'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const formated = [];
  const splitDate = date.split(fromFormat[3]);
  let year;
  let month;
  let day;

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i] === 'YYYY' || fromFormat[i] === 'YY') {
      year = splitDate[i];
    }

    if (fromFormat[i] === 'MM') {
      month = splitDate[i];
    }

    if (fromFormat[i] === 'DD') {
      day = splitDate[i];
    }
  }

  for (const toForm of toFormat) {
    switch (toForm) {
      case ('DD'):
        formated.push(day);

        break;

      case ('MM'):
        formated.push(month);

        break;

      case ('YYYY'):
        if (year.length === 4) {
          formated.push(year);
        } else if (year < 30) {
          formated.push(20 + year);
        } else {
          formated.push(19 + year);
        }

        break;

      case ('YY'):
        if (year.length === 2) {
          formated.push(year);
        } else {
          formated.push(year.slice(2));
        }

        break;
    }
  }

  return formated.join(toFormat[3]);
}

module.exports = formatDate;
