'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldSeparator = fromFormat[fromFormat.length - 1];
  const newSeparator = toFormat[toFormat.length - 1];

  fromFormat.length--;
  toFormat.length--;

  const oldDates = date.split(oldSeparator);
  const datesMapping = {};
  const newDates = [];

  for (let i = 0; i < oldDates.length; i++) {
    datesMapping[fromFormat[i]] = oldDates[i];
  }

  for (const el of toFormat) {
    if (el.includes('YY')) {
      const year = datesMapping['YY'] || datesMapping['YYYY'];

      newDates.push(formatYear(year, el));
      continue;
    }

    newDates.push(datesMapping[el]);
  }

  return newDates.join(newSeparator);
}

function formatYear(year, toFormat) {
  if (toFormat === 'YY') {
    return year.length === 2 ? year : year.slice(2, 4);
  }

  if (year.length === 4) {
    return year;
  }

  if (+year < 30) {
    return '20' + year;
  }

  return '19' + year;
}

module.exports = formatDate;
