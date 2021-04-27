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

function formatDate(date, fromFormat, toFormat) {
  const days = 'DD';
  const month = 'MM';
  const year2 = 'YY';
  const year4 = 'YYYY';

  const daysOld = fromFormat.indexOf(days);
  const monthOld = fromFormat.indexOf(month);
  const year2Old = fromFormat.indexOf(year2);
  const year4Old = fromFormat.indexOf(year4);

  const daysNew = toFormat.indexOf(days);
  const monthNew = toFormat.indexOf(month);
  const year2New = toFormat.indexOf(year2);
  const year4New = toFormat.indexOf(year4);

  let result = '';
  const sсheme = [];

  // find date array

  const dateArray = date.split(fromFormat[3]);

  // make new date format

  sсheme[daysNew] = dateArray[daysOld];
  sсheme[monthNew] = dateArray[monthOld];

  if (year2Old === -1) {
    if (year2New === -1) {
      sсheme[year4New] = dateArray[year4Old];
    } else {
      sсheme[year2New] = (dateArray[year4Old] / 100).toString().split('.')[1];
      // 1234 --> 12.34 --> ( [12, 34][1] )
    }
  }

  if (year4Old === -1) {
    if (year4New === -1) {
      sсheme[year2New] = dateArray[year2Old];
    } else {
      if (+dateArray[year2Old] < 30) { // '20/02/18'  2020
        sсheme[year4New] = +('20' + dateArray[year2Old]);
      }

      if (dateArray[year2Old] === '00') {
        sсheme[year4New] = +('20' + dateArray[year2Old]);
      }

      if (dateArray[year2Old] >= '30') { // '30.02.18'  1930
        sсheme[year4New] = +('19' + dateArray[year2Old]);
      }
    }
  }

  result = sсheme.join(toFormat[3]);

  return result;
}

module.exports = formatDate;
