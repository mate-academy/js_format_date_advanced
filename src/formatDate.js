'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const splittedDate = date.split(fromFormat.pop());
  const fromDateFormat = [];
  const toDateFormat = [];

  for (let i = 0; i < splittedDate.length; i++) {
    switch (fromFormat[i]) {
      case 'YY':
      case 'YYYY':
        fromDateFormat[0] = splittedDate[i];
        break;
      case 'MM':
        fromDateFormat[1] = splittedDate[i] - 1;
        break;
      case 'DD':
        fromDateFormat[2] = splittedDate[i];
        break;
    }
  }

  const dateObj = new Date(...fromDateFormat);

  for (let i = 0; i < fromDateFormat.length; i++) {
    switch (toFormat[i]) {
      case 'YY':
        toDateFormat.push(dateObj.getFullYear().toString().slice(-2));
        break;
      case 'YYYY':
        if (fromFormat.includes('YY')) {
          const year = fromDateFormat[0];

          toDateFormat.push(year < 30 ? '20' + year : '19' + year);
        } else {
          toDateFormat.push(dateObj.getFullYear());
        }
        break;
      case 'MM':
        const month = dateObj.getMonth() + 1;

        if (month < 10) {
          toDateFormat.push(`0${month}`);
        } else {
          toDateFormat.push(month);
        }
        break;
      case 'DD':
        toDateFormat.push(dateObj.getDate());
        break;
    }
  }

  return toDateFormat.join(toFormat.pop());
}

module.exports = formatDate;
