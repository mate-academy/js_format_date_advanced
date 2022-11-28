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

  const format = {
    from: fromFormat,
    to: toFormat,
  };
  const positions = ['start', 'mid', 'end'];

  for (let i = 0; i < positions.length; i++) {
    for (const source in format) {
      if (format[source][i].includes('Y')) {
        year[source][positions[i]] = true;
        year[source][format[source][i].length] = true;
      }
    }
  }

  const index = fromFormat.findIndex((element) => element.includes('Y'));
  const y = year.from[2]
    ? (newDate[index] < 30 ? '20' : '19') + newDate[index]
    : newDate[index].slice(2);

  switch (true) {
    case (year.from.mid && year.to.end)
      || (year.from.start && year.to.mid):
      newDate.unshift(newDate.pop());
      break;

    case (year.from.mid && year.to.start)
      || (year.from.end && year.to.mid):
      newDate.push(newDate.shift());
      break;

    case (year.from.start && year.to.end)
      || (year.from.end && year.to.start):
      newDate.reverse();
      break;

    case (year.from[2] && year.to[4])
      || (year.from[4] && year.to[2]):
      newDate.splice(index, 1, y);
      break;

    default:
      break;
  }

  return newDate.join(toFormat[3]);
}

module.exports = formatDate;
