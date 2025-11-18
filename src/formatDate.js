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

  const dateArray = date.split(fromSeparator);

  const day = dateArray[fromFormat.indexOf('DD')];
  const month = dateArray[fromFormat.indexOf('MM')];
  const formattedYear = getFomattedYear(dateArray, fromFormat, toFormat);
  const yearToFormat = toFormat.find((item) => item.startsWith('YY'));

  const newDateArray = [];

  newDateArray[toFormat.indexOf('DD')] = day;
  newDateArray[toFormat.indexOf('MM')] = month;
  newDateArray[toFormat.indexOf(yearToFormat)] = formattedYear;

  return newDateArray.join(toSeparator);
}

function getFomattedYear(dateArray, fromFormat, toFormat) {
  const yearFromFormat = fromFormat.find((item) => item.startsWith('YY'));
  const year = dateArray[fromFormat.indexOf(`${yearFromFormat}`)];
  const yearToFormat = toFormat.find((item) => item.startsWith('YY'));

  let formattedYear = year;

  if (yearFromFormat.length > yearToFormat.length) {
    formattedYear = year.slice(-2);
  }

  if (yearFromFormat.length < yearToFormat.length) {
    if (year < 30) {
      formattedYear = `20${year}`;
    } else {
      formattedYear = `19${year}`;
    }
  }

  return formattedYear;
}

module.exports = formatDate;
