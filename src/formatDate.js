'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const main = date.split(fromFormat[3]);
  const indexFrom = fromFormat.indexOf('YY');
  const indexLongFrom = fromFormat.indexOf('YYYY');
  const indexTo = toFormat.indexOf('YY');
  const indexLongTo = toFormat.indexOf('YYYY');
  const indexMonthFrom = fromFormat.indexOf('MM');
  const indexMonthTo = toFormat.indexOf('MM');
  const indexDayFrom = fromFormat.indexOf('DD');
  const indexDayTo = toFormat.indexOf('DD');

  const year = 'YY';
  const longYear = 'YYYY';

  const correctIndexFrom = indexFrom < 0 ? indexLongFrom : indexFrom;
  const correctIndexTo = indexTo < 0 ? indexLongTo : indexTo;

  let data = main[correctIndexFrom];

  // step 1

  if (fromFormat[correctIndexFrom] === longYear
    && toFormat[correctIndexTo] === year) {
    data = main[correctIndexFrom].slice(2);
  }

  if (fromFormat[correctIndexFrom] === year
    && toFormat[correctIndexTo] === longYear) {
    if (Number(main[correctIndexFrom]) < 30) {
      data = '20' + main[correctIndexFrom];
    }

    if (Number(main[correctIndexFrom]) >= 30) {
      data = '19' + main[correctIndexFrom];
    }
  }

  // step 2

  const replacement = [...main];

  replacement[correctIndexTo] = data;
  replacement[indexMonthTo] = main[indexMonthFrom];
  replacement[indexDayTo] = main[indexDayFrom];

  return replacement.join(toFormat[3]);
}

module.exports = formatDate;
