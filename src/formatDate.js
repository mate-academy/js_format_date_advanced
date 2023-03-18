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

function formatDate(dateString, sourceFormat, targetFormat) {
  const dateParts = dateString.split(sourceFormat[3]);
  const sourceOrder = sourceFormat.slice(0, 3).map(part => part.charAt(0));
  const targetOrder = targetFormat.slice(0, 3).map(part => part.charAt(0));
  const yearIndex = sourceOrder.indexOf('Y');
  const yearLength = sourceFormat[yearIndex].length;

  const partMap = {};

  for (let i = 0; i < 3; i++) {
    partMap[targetOrder.indexOf(sourceOrder[i])] = i;
  }

  if (yearIndex !== -1 && yearLength === 2
     && targetFormat[yearIndex] === 'YYYY') {
    const year = parseInt(dateParts[yearIndex], 10);

    dateParts[yearIndex] = year < 30 ? `20${dateParts[yearIndex]}` : `19${dateParts[yearIndex]}`;
  } else if (yearIndex !== -1 && yearLength === 4
     && targetFormat[yearIndex] === 'YY') {
    dateParts[yearIndex] = dateParts[yearIndex].slice(-2);
  }

  const targetParts = [ dateParts[partMap[0]],
    dateParts[partMap[1]],
    dateParts[partMap[2]],
  ];

  return targetParts.join(targetFormat[3]);
}
module.exports = formatDate;
