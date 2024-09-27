'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separatorFromFormat = fromFormat[3];
  const separatorToFormat = toFormat[3];
  const dateArray = date.split(separatorFromFormat);
  const newDate = [];

  for (let i = 0; i < 3; i++) {
    const part = toFormat[i];
    const index = fromFormat.indexOf(part);

    newDate[i] = (part.includes('Y'))
      ? getYear(dateArray, fromFormat, toFormat)
      : dateArray[index];
  }

  return newDate.join(separatorToFormat);
}

function getYear(dateArray, fromFormat, toFormat) {
  let indexFromYear;
  let indexToYear;

  for (let i = 0; i < 3; i++) {
    if (fromFormat[i] === 'YY' || fromFormat[i] === 'YYYY') {
      indexFromYear = i;
    }

    if (toFormat[i] === 'YY' || toFormat[i] === 'YYYY') {
      indexToYear = i;
    }
  }

  const year = dateArray[indexFromYear];

  if (fromFormat[indexFromYear] === toFormat[indexToYear]) {
    return year;
  }

  if (fromFormat[indexFromYear] === 'YYYY') {
    return year.substring(2);
  }

  return (year < 30)
    ? '20' + year
    : '19' + year;
}

module.exports = formatDate;
