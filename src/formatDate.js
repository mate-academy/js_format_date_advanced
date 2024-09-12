'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const parts = date.split(fromFormat[3]);
  let year, month, day;

  for (let i = 0; i < fromFormat.length - 1; i++) {
    const part = fromFormat[i];

    switch (part) {
      case 'YYYY':
        year = parts[i];
        break;

      case 'YY':
        year = parts[i].slice(-2);
        break;

      case 'MM':
        month = parts[i];
        break;

      case 'DD':
        day = parts[i];
        break;
    }
  }

  const formattedDate = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    const part = toFormat[i];
    const getBigYear = +year < 30 ? '20' + year : '19' + year;
    const getSmallYear = year.slice(-2);

    switch (part) {
      case 'YYYY':
        formattedDate.push(year.length === 4 ? year : getBigYear);
        break;

      case 'YY':
        formattedDate.push(year.length === 2 ? year : getSmallYear);
        break;

      case 'MM':
        formattedDate.push(month);
        break;

      case 'DD':
        formattedDate.push(day);
        break;
    }
  }

  return formattedDate.join(toFormat[3]);
}

module.exports = formatDate;
