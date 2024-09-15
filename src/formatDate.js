'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separator = fromFormat[fromFormat.length - 1];
  const separatorSecond = toFormat[toFormat.length - 1];
  const currentDate = date.split(separator);
  const newDate = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i] === 'YYYY' && toFormat[i] === 'YY') {
      newDate.push(currentDate[i].slice(-2));
      continue;
    }

    if (fromFormat[i] === 'YY' && toFormat[i] === 'YYYY') {
      let currentYear = currentDate[i];

      if (currentYear < 30) {
        currentYear = '20' + currentYear;
      } else {
        currentYear = '19' + currentYear;
      }
      newDate.push(currentYear);
      continue;
    }

    const indexOfDate = fromFormat.indexOf(toFormat[i]);

    newDate.push(currentDate[indexOfDate]);
  }

  return newDate.join(separatorSecond);
}

module.exports = formatDate;
