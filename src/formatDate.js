'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const newElement = date.split(fromFormat[3]);
  let yearPosition = fromFormat.indexOf('YYYY');
  const monthPosition = fromFormat.indexOf('MM');
  const dayPosition = fromFormat.indexOf('DD');

  if (yearPosition === -1) {
    yearPosition = fromFormat.indexOf('YY');
  }

  let newYear = newElement[yearPosition];
  const newMonth = newElement[monthPosition];
  const newDay = newElement[dayPosition];
  const newDate = [];

  if (fromFormat[yearPosition] === 'YY') {
    if (newYear.slice(-2) < 30) {
      newYear = '20' + newYear;
    } else {
      newYear = '19' + newYear;
    }
  }

  for (const ch of toFormat) {
    switch (ch) {
      case 'YYYY':
        newDate.push(newYear);
        break;
      case 'YY':
        newDate.push(newYear.slice(-2));
        break;
      case 'MM':
        newDate.push(newMonth);
        break;
      case 'DD':
        newDate.push(newDay);
        break;
    }
  }

  return newDate.join(toFormat[3]);
}

module.exports = formatDate;
