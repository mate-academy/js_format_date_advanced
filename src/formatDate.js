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
  const splittedDate = date.split(fromSeparator);
  const formattedDate = [];
  let currentYear = '';
  let currentMonth = '';
  let currentDay = '';

  for (let i = 0; i < fromFormat.length - 1; i += 1) {
    switch (fromFormat[i][0]) {
      case 'Y':
        currentYear += splittedDate[i];
        break;

      case 'M':
        currentMonth += splittedDate[i];
        break;

      case 'D':
        currentDay += splittedDate[i];
        break;

      default:
        break;
    }
  }

  for (let i = 0; i < toFormat.length - 1; i += 1) {
    let year = currentYear;
    const month = currentMonth;
    const day = currentDay;

    if (year.length > toFormat[i].length) {
      year = year.slice(2);
    }

    if (year.length < toFormat[i].length && +year < 30) {
      year = '20' + year;
    }

    if (year.length < toFormat[i].length && +year >= 30) {
      year = '19' + year;
    }

    switch (toFormat[i][0]) {
      case 'Y':
        formattedDate.push(year);
        break;

      case 'M':
        formattedDate.push(month);
        break;

      case 'D':
        formattedDate.push(day);
        break;

      default:
        break;
    }
  }

  return formattedDate.join(toSeparator);
}

module.exports = formatDate;
