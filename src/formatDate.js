/* eslint-disable no-console */
'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const OLD_SEPARATOR = fromFormat[3];
  const NEW_SEPARATOR = toFormat[3];

  const dateParts = date.split(OLD_SEPARATOR);
  const fromFormatParts = fromFormat.slice(0, 3);
  const toFormatParts = toFormat.slice(0, 3);

  let day = '';
  let month = '';
  let year = '';

  for (let i = 0; i < fromFormatParts.length; i++) {
    switch (fromFormatParts[i]) {
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
    }
  }

  const newDateFormatArr = [];

  for (let i = 0; i < toFormatParts.length; i++) {
    switch (toFormatParts[i]) {
      case 'YYYY':
        if (year.length === 2) {
          const FORMATED_YEAR = Number(year) < 30 ? `20${year}` : `19${year}`;

          newDateFormatArr.push(FORMATED_YEAR);
        } else {
          newDateFormatArr.push(year);
        }
        break;
      case 'YY':
        if (year.length === 4) {
          const FORMATED_YEAR = year.slice(2);

          newDateFormatArr.push(FORMATED_YEAR);
        } else {
          newDateFormatArr.push(year);
        }
        break;
      case 'MM':
        newDateFormatArr.push(month);
        break;
      case 'DD':
        newDateFormatArr.push(day);
        break;
    }
  }

  const newDateFormat = newDateFormatArr.join(NEW_SEPARATOR);

  return newDateFormat;
}

module.exports = formatDate;
