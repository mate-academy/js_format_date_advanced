'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat[3];
  const toSeparator = toFormat[3];
  const dateParts = date.split(fromSeparator);
  const dateObject = {};

  for (let i = 0; i < 3; i++) {
    dateObject[fromFormat[i]] = dateParts[i];
  }

  let fromYear = '';
  let toYear = '';

  for (let i = 0; i < 3; i++) {
    if (fromFormat[i].includes('Y')) {
      fromYear = fromFormat[i];
    }

    if (toFormat[i].includes('Y')) {
      toYear = toFormat[i];
    }
  }

  if (fromYear.length !== toYear.length) {
    const convertedYear = convertYear(dateObject[fromYear], fromYear, toYear);

    delete dateObject[fromYear];
    dateObject[toYear] = convertedYear;
  }

  const newDateParts = toFormat.slice(0, 3).map(part => dateObject[part]);

  return newDateParts.join(toSeparator);
}

function convertYear(year, fromYear, toYear) {
  if (fromYear.length > toYear.length) {
    return year.slice(-2);
  } else if (fromYear.length < toYear.length) {
    return (parseInt(year) >= 30 ? '19' : '20') + year;
  } else {
    return year;
  }
}

module.exports = formatDate;
