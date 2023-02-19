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
  const splitted1 = date.split(/[-:/:.]/).reverse();

  const splitted2 = date.split(/[-:/:.]/);

  const separator = toFormat.slice(toFormat.length - 1);

  const wholeJoinedFrom = fromFormat.join('');

  const wholeJoinedTo = toFormat.join('');

  const realToFormat = toFormat.slice(0, toFormat.length - 1).sort();

  const realFromFormat = fromFormat.slice(0, fromFormat.length - 1).sort();

  const toYear = realToFormat[realToFormat.length - 1];

  const fromYear = realFromFormat[realFromFormat.length - 1];

  const smallerPoped = splitted2.pop();

  const sliced1 = wholeJoinedFrom.slice(0, -1);

  const sliced2 = wholeJoinedTo.slice(0, -1);

  const sliced3 = wholeJoinedFrom.charAt(wholeJoinedFrom.length - 1);

  const sliced4 = wholeJoinedTo.charAt(wholeJoinedTo.length - 1);

  if (wholeJoinedFrom === 'MMYYYYDD-' || wholeJoinedFrom === 'DDYYYYMM-') {
    const popedsplit1 = splitted1.pop(2);
    const popedsplit2 = splitted1.pop(3);

    splitted1.push(popedsplit1, popedsplit2);

    return splitted1.join(separator);
  }

  if (wholeJoinedFrom.length === wholeJoinedTo.length
    && sliced1 === sliced2
    && sliced3 !== sliced4) {
    return splitted1.reverse().join(separator);
  }

  if (wholeJoinedFrom === wholeJoinedTo) {
    return splitted1.join(separator);
  }

  if (wholeJoinedFrom === wholeJoinedTo) {
    return splitted1.join(separator);
  }

  if (toYear.length < fromYear.length) {
    splitted2.push(smallerPoped.slice(2));

    return splitted2.join(separator);
  }

  const poped = splitted1.pop();

  if (toYear.length > fromYear.length && poped >= '30') {
    splitted1.push('19' + poped);

    return splitted1.reverse().join(separator);
  }

  if (toYear.length > fromYear.length && poped < '30') {
    splitted1.push('20' + poped);

    return splitted1.reverse().join(separator);
  }

  splitted1.push(poped);

  return splitted1.join(separator);
}

module.exports = formatDate;
