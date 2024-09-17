'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separator = fromFormat[3];
  const arrDate = date.split(separator);

  const dayIndex = fromFormat.indexOf('DD');
  const monthIndex = fromFormat.indexOf('MM');
  let yearIndex = fromFormat.indexOf('YY');

  if (yearIndex === -1) {
    yearIndex = fromFormat.indexOf('YYYY');
  }

  const day = arrDate[dayIndex];
  const month = arrDate[monthIndex];
  let year = arrDate[yearIndex];

  if (year.length === 2) {
    if (year < 30) {
      year = '20' + year;
    } else {
      year = '19' + year;
    }
  }

  const formattedDate = [];

  for (let i = 0; i < toFormat.length; i++) {
    switch (toFormat[i]) {
      case 'DD':
        formattedDate.push(day);
        break;
      case 'MM':
        formattedDate.push(month);
        break;
      case 'YYYY':
        formattedDate.push(year);
        break;
      case 'YY':
        formattedDate.push(year.slice(-2));
        break;
    }
  }

  return formattedDate.join(toFormat[3]);
}

module.exports = formatDate;
