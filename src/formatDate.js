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
  const newDate = date.split(fromFormat[3]);
  const year = {
    from: {
      start: false,
      mid: false,
      end: false,
      2: false,
      4: false,
    },
  };

  year.to = { ...year.from };

  const positions = ['start', 'mid', 'end'];
  let index;

  for (let i = 0; i < positions.length; i++) {
    if (fromFormat[i].includes('Y')) {
      index = i;
      year.from[positions[i]] = true;
      year.from[fromFormat[i].length] = true;
    }

    if (toFormat[i].includes('Y')) {
      year.to[positions[i]] = true;
      year.to[toFormat[i].length] = true;
    }
  }

  const y = year.from[2]
    ? (newDate[index] < 30 ? '20' : '19') + newDate[index]
    : newDate[index].slice(2);

  const moveYearRight
    = (year.from.mid && year.to.end)
    || (year.from.start && year.to.mid);

  const moveYearLeft
    = (year.from.mid && year.to.start)
    || (year.from.end && year.to.mid);

  const reverseYearIndex
    = (year.from.start && year.to.end)
    || (year.from.end && year.to.start);

  const changeYearFormat
    = (year.from[2] && year.to[4])
    || (year.from[4] && year.to[2]);

  switch (true) {
    case moveYearRight:
      newDate.unshift(newDate.pop());
      break;

    case moveYearLeft:
      newDate.push(newDate.shift());
      break;

    case reverseYearIndex:
      newDate.reverse();
      break;

    case changeYearFormat:
      newDate.splice(index, 1, y);
      break;

    default:
      break;
  }

  return newDate.join(toFormat[3]);
}

module.exports = formatDate;
