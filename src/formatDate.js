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
  const dateMap = initDateMap(date, fromFormat);
  let formatedDate = String();
  const toSeparator = toFormat[3];

  for (let i = 0; i < toFormat.length - 1; i++) {
    formatedDate += getDatePart(toFormat[i], dateMap) + toSeparator;
  }

  return formatedDate.substr(0, formatedDate.length - 1);
}

function initDateMap(date, fromFormat) {
  const rawDate = getNoSeparatorDate(date, fromFormat);
  const dateMap = new Map();
  let currentLength = 0;

  for (let i = 0; i < fromFormat.length - 1; i++) {
    const leftIndex = currentLength;
    const rightIndex = leftIndex + fromFormat[i].length;
    const typeKey = fromFormat[i].charAt(0);

    dateMap.set(typeKey, rawDate.substring(leftIndex, rightIndex));
    currentLength += fromFormat[i].length;
  }

  return dateMap;
}

function getDatePart(dateMapping, map) {
  const key = dateMapping.charAt(0);

  if (key === 'Y') {
    return convertYear(map.get(key), dateMapping);
  }

  return map.get(key);
}

function convertYear(value, mapping) {
  if (value.length >= mapping.length) {
    return value.substr(value.length - mapping.length, mapping.length);
  }

  return Number(value) < 30 ? '20' + value : '19' + value;
}

function getNoSeparatorDate(date, format) {
  const separator = format[3] === '.' ? '\\.' : format[3];
  const dilimeterRegex = new RegExp(separator, 'g');

  return date.replace(dilimeterRegex, '');
}

module.exports = formatDate;
