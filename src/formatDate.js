'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(dateString, fromFormat, toFormat) {
  const dateParts = dateString.split(fromFormat[3]);
  let year;
  let month;
  let day;
  const newDate = [];

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i] === 'YYYY') {
      year = dateParts[i];
    }

    if (fromFormat[i] === 'YY') {
      year = dateParts[i] < 30 ? `20${dateParts[i]}` : `19${dateParts[i]}`;
    }

    if (fromFormat[i] === 'MM') {
      month = dateParts[i];
    }

    if (fromFormat[i] === 'DD') {
      day = dateParts[i];
    }
  }

  for (const format of toFormat) {
    switch (format) {
      case 'YYYY':
        newDate.push(year);
        break;

      case 'YY':
        newDate.push(year.slice(-2));
        break;

      case 'MM':
        newDate.push(month);
        break;

      case 'DD':
        newDate.push(day);
    }
  }

  return newDate.join(toFormat[3]);
}

module.exports = formatDate;
