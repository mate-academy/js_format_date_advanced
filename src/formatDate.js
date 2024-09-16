'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldSeparator = fromFormat[3];
  const newSeparator = toFormat[3];
  const dateBefore = date.split(oldSeparator);
  const dateAfter = [];

  let day;
  let month;
  let year;

  for (let i = 0; i < fromFormat.length - 1; i++) {
    switch (fromFormat[i]) {
      case 'DD':
        day = dateBefore[i];
        break;

      case 'MM':
        month = dateBefore[i];
        break;

      case 'YY':
        year = dateBefore[i];
        break;

      case 'YYYY':
        year = dateBefore[i];
        break;

      default:
        break;
    }
  }

  for (const newFormat of toFormat) {
    switch (newFormat) {
      case 'DD':
        dateAfter.push(day);
        break;

      case 'MM':
        dateAfter.push(month);
        break;

      case 'YY':
        dateAfter.push(formatTheYear(year, newFormat));
        break;

      case 'YYYY':
        dateAfter.push(formatTheYear(year, newFormat));
        break;

      default:
        break;
    }
  }

  return dateAfter.join(newSeparator);
}

function formatTheYear(year, format) {
  if (year.length === 4 && format === 'YY') {
    return year.slice(2);
  }

  if (year.length === 2 && format === 'YYYY') {
    return (parseInt(year) < 30)
      ? '20' + year
      : '19' + year;
  }

  return year;
}

module.exports = formatDate;
