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
  const fullDate = {};
  const fullDateReordered = [];
  const dateSplitted = date.split(fromSeparator);

  for (let i = 0; i < dateSplitted.length; i++) {
    const dateFormat = fromFormat[i];
    const dateValue = dateSplitted[i];

    if (dateFormat.includes('Y')) {
      fullDate.year = dateValue;
    }

    if (dateFormat.includes('M')) {
      fullDate.month = dateValue;
    }

    if (dateFormat.includes('D')) {
      fullDate.day = dateValue;
    }
  }

  for (let y = 0; y < toFormat.length - 1; y++) {
    if (toFormat[y] === 'YYYY') {
      if (fullDate.year.length === 2) {
        const prefix = +fullDate.year < 30 ? '20' : '19';

        fullDateReordered.push(prefix + fullDate.year);
      } else {
        fullDateReordered.push(fullDate.year);
      }
    }

    if (toFormat[y] === 'YY') {
      if (fullDate.year.length === 4) {
        const yearSliced = fullDate.year.slice(-2);

        fullDateReordered.push(yearSliced);
      } else {
        fullDateReordered.push(fullDate.year);
      }
    }

    if (toFormat[y] === 'MM') {
      fullDateReordered.push(fullDate.month);
    }

    if (toFormat[y] === 'DD') {
      fullDateReordered.push(fullDate.day);
    }
  }

  const result = fullDateReordered.join(toSeparator);

  return result;
}

module.exports = formatDate;
