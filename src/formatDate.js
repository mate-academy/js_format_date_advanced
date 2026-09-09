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
  const newDate = [];
  const dateArray = date.split(fromFormat[fromFormat.length - 1]);
  const dayIndex = fromFormat.indexOf('DD');
  const day = dateArray[dayIndex];
  const monthIndex = fromFormat.indexOf('MM');
  const month = dateArray[monthIndex];
  const fromYearFormat = fromFormat.includes('YYYY') ? 'YYYY' : 'YY';

  let yearIndex = fromFormat.indexOf('YYYY');

  if (yearIndex === -1) {
    yearIndex = fromFormat.indexOf('YY');
  }

  const year = dateArray[yearIndex];

  for (const element of toFormat) {
    if (element === 'DD') {
      newDate.push(day);
    }

    if (element === 'MM') {
      newDate.push(month);
    }

    if (element === fromYearFormat) {
      newDate.push(year);
    }

    if (element === 'YY' && fromYearFormat === 'YYYY') {
      newDate.push(year.slice(-2));
    }

    if (element === 'YYYY' && fromYearFormat === 'YY') {
      if (Number(year) < 30) {
        newDate.push('20' + year);
      } else {
        newDate.push('19' + year);
      }
    }
  }

  const result = newDate.join(toFormat[toFormat.length - 1]);

  return result;
}

module.exports = formatDate;
