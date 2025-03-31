'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldSeparator = fromFormat[3];
  const newSeparator = toFormat[3];
  const oldDate = date.split(oldSeparator);
  const newDate = [];
  let day = '';
  let month = '';
  let year = '';
  let oldYearFormat = '';
  let newYearFormat = '';

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i] === 'DD') {
      day = oldDate[i];
    } else if (fromFormat[i] === 'YY' || fromFormat[i] === 'YYYY') {
      year = oldDate[i];
      oldYearFormat = fromFormat[i];
    } else {
      month = oldDate[i];
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'DD') {
      newDate[i] = day;
    } else if (toFormat[i] === 'YY' || toFormat[i] === 'YYYY') {
      newYearFormat = toFormat[i];
      newDate[i] = convertYear(year, oldYearFormat, newYearFormat);
    } else {
      newDate[i] = month;
    }
  }

  return newDate.join(newSeparator);
}

function convertYear(oldYear, oldFormat, newFormat) {
  let newYear = '';

  if (oldFormat === 'YYYY' && newFormat === 'YY') {
    newYear = (+oldYear % 100).toString();
  } else if (oldFormat === 'YY' && newFormat === 'YYYY') {
    if (+oldYear < 30) {
      newYear = '20' + oldYear;
    } else {
      newYear = '19' + oldYear;
    }
  } else {
    newYear = oldYear;
  }

  return newYear;
}

module.exports = formatDate;
