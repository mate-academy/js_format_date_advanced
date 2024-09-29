'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // '2020-02-18', ['YYYY', 'MM', 'DD', '-'], ['DD', 'MM', 'YY', '.']

  const separatorFrom = fromFormat[fromFormat.length - 1]; // '-',
  const separatorToFormat = toFormat[toFormat.length - 1]; // '.'

  const formattedDatePart = [];

  const dateParts = date.split(separatorFrom); // ['2020', '02', '18'],
  const dayIndex = takeIndexOf(fromFormat, 'DD'); // [2]
  const monthIndex = takeIndexOf(fromFormat, 'MM'); // [1]
  const yearIndex = takeIndexOf(fromFormat, 'YYYY'); // [0]

  let year = dateParts[yearIndex]; // '2020' [0]
  const month = dateParts[monthIndex]; // '02' [1]
  const day = dateParts[dayIndex]; // '18' [2]

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    if (+year < 30) {
      year = '20' + year;
    } else {
      year = '19' + year;
    }
  }

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    year = year.slice(2);
  }

  formattedDatePart[takeIndexOf(toFormat, 'YYYY')] = year;
  formattedDatePart[takeIndexOf(toFormat, 'MM')] = month;
  formattedDatePart[takeIndexOf(toFormat, 'DD')] = day;

  return formattedDatePart.join(separatorToFormat);
}

function takeIndexOf(format, param) {
  const index = format.indexOf(param);

  if (index === -1) {
    return format.indexOf('YY');
  }

  return index;
}

module.exports = formatDate;
