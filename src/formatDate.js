'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateArr = date.split(fromFormat[fromFormat.length - 1]);
  const dateObj = {};
  let result = [];
  let index = -1;

  if (fromFormat.indexOf('YY') >= 0) {
    index = fromFormat.indexOf('YY');
  } else {
    index = fromFormat.indexOf('YYYY');
  }

  let year = dateArr[index];

  dateObj['MM'] = dateArr[fromFormat.indexOf('MM')];
  dateObj['DD'] = dateArr[fromFormat.indexOf('DD')];

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    dateObj['YY'] = year.slice(2);
  } else if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    year = year >= 30 ? '19' + year : '20' + year;
    dateObj['YYYY'] = year;
  }

  for (let i = 0; i < fromFormat.length; i++) {
    dateObj[fromFormat[i]] = dateArr[i];
  }

  result = toFormat.map((el) => dateObj[el] || '');
  result.length = 3;

  return result.join(toFormat[3]);
}

module.exports = formatDate;
