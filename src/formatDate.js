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

  for (let i = 0; i < fromFormat.length; i++) {
    switch (fromFormat[i]) {
      case 'YYYY':
        year = +dateParts[i];
        break;

      case 'YY' :
        year = +(dateParts[i] < 30 ? '20' : '19') + dateParts[i];
        break;

      case 'MM':
        month = (dateParts[i].length === 1) ? `0${+dateParts[i]}` : dateParts[i];
        break;

      case 'DD':
        day = (dateParts[i].length === 1) ? `0${+dateParts[i]}` : dateParts[i];
        break;
    }
  }

  const newDate = [];

  for (let i = 0; i < toFormat.length; i++) {
    switch (toFormat[i]) {
      case 'YYYY':
        newDate.push(year);
        break;

      case 'YY' :
        newDate.push(year.toString().slice(-2));
        break;

      case 'MM':
        newDate.push(month);
        break;

      case 'DD':
        newDate.push(day);
        break;
    }
  }

  const formattedDate = newDate.join(toFormat[3]);

  return formattedDate;
}

module.exports = formatDate;
