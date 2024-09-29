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
  const dayIndex = fromFormat.indexOf('DD'); // [2]
  const monthIndex = fromFormat.indexOf('MM'); // [1]
  const yearIndex =
    fromFormat.indexOf('YYYY') !== -1
      ? fromFormat.indexOf('YYYY')
      : fromFormat.indexOf('YY'); // [2]

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

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i] === 'YYYY' || toFormat[i] === 'YY') {
      formattedDatePart[i] = year;
    }

    if (toFormat[i] === 'MM') {
      formattedDatePart[i] = month;
    }

    if (toFormat[i] === 'DD') {
      formattedDatePart[i] = day;
    }
  }

  return formattedDatePart.join(separatorToFormat);
}

module.exports = formatDate;
