'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromFormatArray = date.split(fromFormat[fromFormat.length - 1]);

  let month = null;
  let day = null;
  let year = null;
  let isLongYear = false;

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i] === 'DD') {
      day = fromFormatArray[i];
    }

    if (fromFormat[i] === 'MM') {
      month = fromFormatArray[i];
    }

    if (fromFormat[i] === 'YY') {
      year = fromFormatArray[i];
    }

    if (fromFormat[i] === 'YYYY') {
      year = fromFormatArray[i];
      isLongYear = true;
    }
  }

  const formattedDate = [];

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i] === 'DD') {
      formattedDate.push(day);
    }

    if (toFormat[i] === 'MM') {
      formattedDate.push(month);
    }

    if (toFormat[i] === 'YYYY' && isLongYear) {
      formattedDate.push(year);
    }

    if (toFormat[i] === 'YYYY' && !isLongYear) {
      if (year < 30) {
        formattedDate.push('20' + year);
      } else {
        formattedDate.push('19' + year);
      }
    }

    if (toFormat[i] === 'YY' && !isLongYear) {
      formattedDate.push(year);
    }

    if (toFormat[i] === 'YY' && isLongYear) {
      formattedDate.push(year.slice(-2));
    }
  }

  const newSeparator = toFormat[toFormat.length - 1];

  return formattedDate.join(newSeparator);
}

module.exports = formatDate;
