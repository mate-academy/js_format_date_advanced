'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const result = [];
  const oldSep = fromFormat[fromFormat.length - 1];
  const newSep = toFormat[toFormat.length - 1];

  const newFrom = date.split(oldSep);
  let yearIndex = fromFormat.indexOf('YYYY');

  if (yearIndex === -1) {
    yearIndex = fromFormat.indexOf('YY');
  }

  const monthIndex = fromFormat.indexOf('MM');
  const dayIndex = fromFormat.indexOf('DD');

  const day = newFrom[dayIndex];
  const month = newFrom[monthIndex];
  let year = newFrom[yearIndex];

  if (year.length === 2) {
    year = Number(year) < 30 ? '20' + year : '19' + year;
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    const currentFormatPart = toFormat[i];

    if (currentFormatPart === 'YYYY') {
      result.push(year);
    } else if (currentFormatPart === 'YY') {
      result.push(year.slice(-2));
    } else if (currentFormatPart === 'MM') {
      result.push(month);
    } else if (currentFormatPart === 'DD') {
      result.push(day);
    }
  }

  return result.join(newSep);
}

module.exports = formatDate;
