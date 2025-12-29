'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromFormatSeparate = date.split(fromFormat[3]);
  const day = fromFormatSeparate[fromFormat.indexOf('DD')];
  const month = fromFormatSeparate[fromFormat.indexOf('MM')];
  let year = 0;

  if (fromFormat.includes('YY')) {
    year = fromFormatSeparate[fromFormat.indexOf('YY')];
  } else {
    year = fromFormatSeparate[fromFormat.indexOf('YYYY')];
  }

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    if (Number(year) < 30) {
      year = '20' + year;
    } else {
      year = '19' + year;
    }
  } else if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    year = year[year.length - 2] + year[year.length - 1];
  }

  const newDate = [];

  newDate[toFormat.indexOf('DD')] = day;
  newDate[toFormat.indexOf('MM')] = month;

  if (toFormat.includes('YY')) {
    newDate[toFormat.indexOf('YY')] = year;
  } else {
    newDate[toFormat.indexOf('YYYY')] = year;
  }

  return newDate.join(toFormat[3]);
}

module.exports = formatDate;
