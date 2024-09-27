'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateArray = date.split(fromFormat[fromFormat.length - 1]);
  const newDate = [];
  const newSeparator = toFormat.slice(-1);
  const dateObject = {};

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i].includes('D')) {
      dateObject.day = dateArray[i];
    }

    if (fromFormat[i].includes('M')) {
      dateObject.month = dateArray[i];
    }

    if (fromFormat[i].includes('Y')) {
      dateObject.year = dateArray[i];
    }
  }

  const { day, month, year } = dateObject;

  for (const format of toFormat) {
    if (format.includes('Y')) {
      if (format.length < year.length) {
        newDate.push(year.slice(2));
      } else if (format.length === year.length) {
        newDate.push(year);
      } else {
        const formYear = (year >= 30 ? '19' : '20') + year;

        newDate.push(formYear);
      }
    }

    if (format.includes('M')) {
      newDate.push(month);
    }

    if (format.includes('D')) {
      newDate.push(day);
    }
  }

  return newDate.join(newSeparator);
}

module.exports = formatDate;
