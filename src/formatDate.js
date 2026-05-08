'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // write code here
  const fromDivider = fromFormat.at(-1);
  const toDivider = toFormat.at(-1);

  const sourceDate = date.split(fromDivider);
  let day = '';
  let month = '';
  let year = '';
  let yearToFormat = '';

  for (let i = 0; i < sourceDate.length; i++) {
    if (toFormat[i].includes('Y')) {
      yearToFormat = toFormat[i];
    }

    if (fromFormat[i].includes('D')) {
      day = sourceDate[i];
      continue;
    }

    if (fromFormat[i].includes('M')) {
      month = sourceDate[i];
      continue;
    }

    if (fromFormat[i].includes('Y')) {
      year = sourceDate[i];
      continue;
    }
  }

  // check if year format is YY or YYYY and set new format for year
  if (year.length === 4 && yearToFormat.length === 2) {
    year = year.slice(-2);
  }

  if (year.length === 2 && yearToFormat.length === 4) {
    year = year < 30 ? `20${year}` : `19${year}`;
  }

  const result = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i].includes('D')) {
      result.push(day);
      continue;
    }

    if (toFormat[i].includes('M')) {
      result.push(month);
      continue;
    }

    if (toFormat[i].includes('Y')) {
      result.push(year);
      continue;
    }
  }

  return result.join(toDivider);
}

module.exports = formatDate;
