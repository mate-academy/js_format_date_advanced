'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // create property for symbols from and to
  const symbolFormat = fromFormat[fromFormat.length - 1];
  const symbolTo = toFormat[toFormat.length - 1];
  // create split array from date
  const dateParts = date.split(symbolFormat);
  // create property that will save new date
  let year = Number();
  let day = Number();
  let month = Number();

  // add value for year, day, month from dateParts
  for (let i = 0; i < fromFormat.length - 1; i++) {
    switch (fromFormat[i]) {
      case 'YYYY':
      case 'YY':
        year = dateParts[i];
        break;
      case 'MM':
        month = dateParts[i];
        break;
      case 'DD':
        day = dateParts[i];
        break;
      default:
        break;
    }
  }

  // create new array that will have new result
  const newDate = [];

  // add date to new array
  for (let i = 0; i < toFormat.length - 1; i++) {
    switch (toFormat[i]) {
      case 'YYYY':
        // if we need to create YYYY from 2 number,
        // add "20" if year <30 or 19 if year >= 30
        if (year.length === 2) {
          if (year < 30) {
            newDate.push('20' + year);
          } else {
            newDate.push('19' + year);
          }
        } else {
          newDate.push(year);
        }
        break;
      case 'YY':
        // if we need create YY from YYYY remove first 2 number
        if (year.length === 4) {
          newDate.push(year.slice(-2));
        } else {
          newDate.push(year);
        }
        break;
      case 'MM':
        newDate.push(month);
        break;
      case 'DD':
        newDate.push(day);
        break;
      default:
        break;
    }
  }
  // create date with right simbol;

  return newDate.join(symbolTo);
}
module.exports = formatDate;
