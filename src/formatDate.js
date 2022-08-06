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
  // write code here

  const substTo = toFormat[3];
  const fromFormatStr = fromFormat.join();
  const toFormatStr = toFormat.join();
  const indYearFirstFrom = fromFormatStr.indexOf('Y');
  const indYearLastFrom = fromFormatStr.lastIndexOf('Y');
  const indMonFirstFrom = fromFormatStr.indexOf('M');
  const indDayFirstFrom = fromFormatStr.indexOf('D');
  const indYearFirstTo = toFormatStr.indexOf('Y');
  const indYearLastTo = toFormatStr.lastIndexOf('Y');
  const indMonFirstTo = toFormatStr.indexOf('M');
  const indDayFirstTo = toFormatStr.indexOf('D');
  let dataYear = '';
  let dataMon = '';
  let dataDay = '';
  let flagShort = false;
  let dataYearNew = '';

  let res = '';

  if (indYearLastFrom - indYearFirstFrom > 1) {
    dataYear = date[indYearFirstFrom] + date[indYearFirstFrom + 1]
    + date[indYearFirstFrom + 2] + date[indYearFirstFrom + 3];
  } else {
    dataYear = date[indYearFirstFrom] + date[indYearFirstFrom + 1];
    flagShort = true;
  }
  dataMon = date[indMonFirstFrom] + date[indMonFirstFrom + 1];
  dataDay = date[indDayFirstFrom] + date[indDayFirstFrom + 1];

  const yearLengthTo = indYearLastTo - indYearFirstTo;

  if (yearLengthTo === 1) {
    if (flagShort === false) {
      dataYearNew = dataYear.slice(2);
    } else {
      dataYearNew = dataYear;
    }
  }

  if (yearLengthTo > 1) {
    if (flagShort === true) {
      if (Number(dataYear) < 30) {
        dataYearNew = '20' + dataYear;
      } else {
        dataYearNew = '19' + dataYear;
      }
    } else {
      dataYearNew = dataYear;
    }
  }

  if (indYearFirstTo === 0) {
    res += dataYearNew + substTo;

    if (toFormatStr[toFormatStr.length - 1] === 'M') {
      res += dataDay + substTo + dataMon;
    } else {
      res += dataMon + substTo + dataDay;
    }
  } else if (indDayFirstTo === 0) {
    res += dataDay + substTo;

    if (toFormatStr[toFormatStr.length - 1] === 'M') {
      res += dataYearNew + substTo + dataMon;
    } else {
      res += dataMon + substTo + dataYearNew;
    }
  } else if (indMonFirstTo === 0) {
    res += dataMon + substTo;

    if (toFormatStr[toFormatStr.length - 1] === 'D') {
      res += dataYearNew + substTo + dataDay;
    } else {
      res += dataDay + substTo + dataYearNew;
    }
  }

  return res;
};
module.exports = formatDate;
