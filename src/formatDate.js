'use strict';

/**
 *   Time flies, standards change. Let's get rid of the routine of changing the
 * date format. Create a `formatDate` function that accepts the `date` string,
 * the old `fromFormat` array and the new `toFormat` array. Function returns
 * given date in new format.
 *   The function can change a separator, reorder the date parts of convert a
 * year from 4 digits to 2 digits and back.
 *   When converting from YYYY to YY just use 2 last digit (1997 -> 97).
 *   When converting from YY to YYYY use 20YY if YY < 30 and 19YY otherwise.
 *
 * Examples:
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.2020'
 *
 * formatDate(
 *   '18-02-2020',
 *   ['DD', 'MM', 'YYYY', '-'],
 *   ['DD', 'MM', 'YY', '/'],
 * ) // '18/02/20'
 *
 * formatDate(
 *   '20/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '97/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.1997'
 *
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

const transformYear = (toFormat, fromFormat, value, index) => {
  if (toFormat.includes('YY')) {
    return value[index].slice(2);
  }

  if (fromFormat.includes('YY')) {
    return +value[index] < 30 ? `20${value[index]}` : `19${value[index]}`;
  } else {
    return value[index];
  }
};

function formatDate(date, fromFormat, toFormat) {
  const splitNewData = [];

  const separateOldFormat = fromFormat[3];

  const indexOldMonth = fromFormat.indexOf('MM');
  const indexOldDay = fromFormat.indexOf('DD');

  const indexNewMonth = toFormat.indexOf('MM');
  const indexNewDay = toFormat.indexOf('DD');

  const indexNewYear = toFormat.findIndex((element) => element === 'YY'
  || element === 'YYY' || element === 'YYYY');

  const indexOldYear = fromFormat.findIndex((element) => element === 'YY'
  || element === 'YYY' || element === 'YYYY');

  const dataSplited = date.split(`${separateOldFormat}`);

  const separateNewFormat = toFormat[3];

  splitNewData[indexNewMonth] = dataSplited[indexOldMonth];
  splitNewData[indexNewDay] = dataSplited[indexOldDay];
  splitNewData[indexNewYear] = dataSplited[indexOldYear];

  splitNewData[indexNewYear] = transformYear(
    toFormat,
    fromFormat,
    splitNewData,
    indexNewYear
  );

  return splitNewData.join(`${separateNewFormat}`);
}

module.exports = formatDate;
