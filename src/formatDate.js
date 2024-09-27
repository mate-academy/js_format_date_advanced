'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const correctDate = [];
  const separator = toFormat[fromFormat.length - 1];
  const splitedDate = date.split(fromFormat[fromFormat.length - 1]);

  for (let i = 0; i < 3; i++) {
    const indexFromFormat = fromFormat.indexOf(toFormat[i]);
    let neededFormatPart;

    if (indexFromFormat !== -1) {
      neededFormatPart = splitedDate[indexFromFormat];
    } else {
      neededFormatPart = converYear(splitedDate, fromFormat, toFormat, i);
    }

    correctDate.push(neededFormatPart);
  }

  return correctDate.join(separator);
}

function converYear(date, fromFormat, toFormat, step) {
  const isYearFullFormat = toFormat[step].length === 4;
  let yearIndex;

  if (isYearFullFormat) {
    yearIndex = fromFormat.indexOf('YY');

    const year = date[yearIndex];

    if (+year >= 30) {
      return '19' + year;
    }

    return '20' + year;
  }

  yearIndex = fromFormat.indexOf('YYYY');

  return date[yearIndex].slice(2);
}

module.exports = formatDate;
