'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const newSeparator = toFormat[toFormat.length - 1];
  const oldSeparator = fromFormat[fromFormat.length - 1];

  const dateParts = date.split(oldSeparator);

  const yearIndexFrom =
    fromFormat.indexOf('YYYY') !== -1
      ? fromFormat.indexOf('YYYY')
      : fromFormat.indexOf('YY');
  const yearIndexTo =
    toFormat.indexOf('YYYY') !== -1
      ? toFormat.indexOf('YYYY')
      : toFormat.indexOf('YY');
  const monthIndexFrom = fromFormat.indexOf('MM');
  const dayIndexFrom = fromFormat.indexOf('DD');

  let year = dateParts[yearIndexFrom];
  const month = dateParts[monthIndexFrom];
  const day = dateParts[dayIndexFrom];

  if (fromFormat[yearIndexFrom] === 'YY' && toFormat[yearIndexTo] === 'YYYY') {
    if (+year < 30) {
      year = `20${year}`;
    } else {
      year = `19${year}`;
    }
  }

  if (fromFormat[yearIndexFrom] === 'YYYY' && toFormat[yearIndexTo] === 'YY') {
    year = year.slice(-2);
  }

  const newDate = [];

  for (const part of toFormat.slice(0, -1)) {
    switch (part) {
      case 'YYYY':
        newDate.push(year);
        break;
      case 'YY':
        newDate.push(year);
        break;
      case 'MM':
        newDate.push(month);
        break;
      case 'DD':
        newDate.push(day);
        break;
    }
  }

  return newDate.join(newSeparator);
}

module.exports = formatDate;
