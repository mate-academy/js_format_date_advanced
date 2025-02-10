'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separatorForNewFormat = toFormat.slice(-1);
  const newDate = date.split(fromFormat[3]);
  const newArr = [];

  let day, month, year, lengthYear;

  for (let i = 0; i < fromFormat.length; i++) {
    switch (true) {
      case fromFormat[i].includes('Y'):
        year = newDate[i];
        break;

      case fromFormat[i].includes('M'):
        month = newDate[i];
        break;

      case fromFormat[i].includes('D'):
        day = newDate[i];
        break;
    }
  }

  for (const format of toFormat) {
    if (format.includes('Y')) {
      if (format.length < year.length) {
        newArr.push(year.slice(-2));
      } else if (format.length === year.length) {
        newArr.push(year);
      } else {
        lengthYear = parseInt(year, 10) < 30 ? '20' + year : '19' + year;
        newArr.push(lengthYear);
      }
    }

    if (format.includes('M')) {
      newArr.push(month);
    }

    if (format.includes('D')) {
      newArr.push(day);
    }
  }

  return newArr.join(separatorForNewFormat);
}

module.exports = formatDate;
