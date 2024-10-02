'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const inputSymbol = fromFormat.pop();
  const outputSymbol = toFormat.pop();

  const inputDateArray = date.split(inputSymbol);

  const inputDate = {
    day: inputDateArray[fromFormat.indexOf('DD')],
    month: inputDateArray[fromFormat.indexOf('MM')],
    year:
      inputDateArray[fromFormat.indexOf('YYYY')] ||
      inputDateArray[fromFormat.indexOf('YY')],
  };

  const outputDate = [];

  outputDate[toFormat.indexOf('DD')] = inputDate.day;
  outputDate[toFormat.indexOf('MM')] = inputDate.month;

  const indexOfYear =
    toFormat.indexOf('YY') >= 0
      ? toFormat.indexOf('YY')
      : toFormat.indexOf('YYYY');

  const outputYearLength = toFormat[indexOfYear].length;

  const inputYearLength = inputDate.year.length;

  if (inputYearLength < outputYearLength) {
    const prefix = inputDate.year >= 30 ? '19' : '20';

    outputDate[indexOfYear] = prefix + inputDate.year;
  } else if (inputYearLength > outputYearLength) {
    outputDate[indexOfYear] = inputDate.year.slice(-2);
  } else {
    outputDate[indexOfYear] = inputDate.year;
  }

  return outputDate.join(outputSymbol);
}

module.exports = formatDate;
