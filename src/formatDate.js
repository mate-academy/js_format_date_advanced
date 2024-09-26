'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateObject = {};
  const dateInput = date.split(fromFormat[3]);
  const newDate = [];

  for (let i = 0; i < fromFormat.length; i++) {
    switch (fromFormat[i]) {
      case 'DD': dateObject.day = dateInput[i];
        break;
      case 'MM': dateObject.month = dateInput[i];
        break;
      case 'YY':
      case 'YYYY': dateObject.year = dateInput[i];
        break;
    }
  }

  for (let i = 0; i < toFormat.length; i++) {
    switch (toFormat[i]) {
      case 'DD': newDate.push(dateObject.day);
        break;
      case 'MM': newDate.push(dateObject.month);
        break;
      case 'YY':
        const year = dateObject.year;

        if (year.length > 2) {
          newDate.push(year.slice(2));
        } else {
          newDate.push(year);
        }
        break;
      case 'YYYY':
        let yearFull = dateObject.year;

        if (yearFull.length < 4) {
          if (yearFull >= 30) {
            yearFull = `19${yearFull}`;
          } else {
            yearFull = `20${yearFull}`;
          }
        }
        newDate.push(yearFull);
        break;
    }
  }

  return newDate.join(toFormat[3]);
}

module.exports = formatDate;
