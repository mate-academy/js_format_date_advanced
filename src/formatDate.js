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

  const formatedYear = [];

  const newDate = date.split(separatorFrom); // ['2020', '02', '18'],
  const dayIndex = takeIndexOf(fromFormat, 'DD'); // [2]
  const monthIndex = takeIndexOf(fromFormat, 'MM'); // [1]
  const yearIndex = takeIndexOf(fromFormat, 'YYYY'); // [0]

  let year = newDate[yearIndex]; // '2020' [0]
  const month = newDate[monthIndex]; // '02' [1]
  const day = newDate[dayIndex]; // '18' [2]

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

  formatedYear[takeIndexOf(toFormat, 'YYYY')] = year;
  formatedYear[takeIndexOf(toFormat, 'MM')] = month;
  formatedYear[takeIndexOf(toFormat, 'DD')] = day;

  return formatedYear.join(separatorToFormat);
}

function takeIndexOf(format, param) {
  const index = format.indexOf(param);

  if (index === -1) {
    return format.indexOf('YY');
  }

  return index;
}

module.exports = formatDate;
