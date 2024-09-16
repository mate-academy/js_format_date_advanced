'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldSep = fromFormat.pop();
  const newSep = toFormat.pop();
  const sepDate = date.split(oldSep);

  const oldIndexes = {
    monthIndex: fromFormat.indexOf('MM'),
    dayIndex: fromFormat.indexOf('DD'),
    yearIndex: (fromFormat.includes('YYYY'))
      ? fromFormat.indexOf('YYYY')
      : fromFormat.indexOf('YY'),
  };

  const newIndexes = {
    monthIndex: toFormat.indexOf('MM'),
    dayIndex: toFormat.indexOf('DD'),
    yearIndex: (toFormat.includes('YYYY'))
      ? toFormat.indexOf('YYYY')
      : toFormat.indexOf('YY'),
  };

  let yearNow = sepDate[oldIndexes.yearIndex];
  const yearToBe = toFormat[newIndexes.yearIndex];

  if (yearNow.length < yearToBe.length) {
    yearNow = (parseInt(yearNow) >= 30)
      ? '19' + yearNow
      : '20' + yearNow;
  }

  if (yearNow.length > yearToBe.length) {
    yearNow = yearNow.slice(2);
  }

  sepDate[oldIndexes.yearIndex] = yearNow;

  for (const index in newIndexes) {
    toFormat[newIndexes[index]] = sepDate[oldIndexes[index]];
  }

  return toFormat.join(newSep);
}
module.exports = formatDate;
