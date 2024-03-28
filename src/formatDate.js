'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateParts = date.split(fromFormat[3]);
  let year;
  let month;
  let day;
  const formattedDate = [];

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
        formattedDate.push(year);
        break;

      case 'YY':
        formattedDate.push(year.slice(-2));
        break;

      case 'MM':
        formattedDate.push(month);
        break;

      case 'DD':
        formattedDate.push(day);
    }
  }

  return formattedDate.join(toFormat[3]);
}

module.exports = formatDate;
