'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const [oldYear, oldMonth, , oldSeparator] = fromFormat;
  const [newYear, , newDay, newSeparator] = toFormat;
  const [a, b, c] = date.split(oldSeparator);

  const isFirstYear = oldYear.indexOf('Y') > -1;
  const isSecondYear = oldMonth.indexOf('Y') === 0;
  const isFirstYearNew = newYear.indexOf('Y') > -1;
  const shiftDate = isFirstYearNew ? newYear.length : newDay.length;
  let year;

  if (isFirstYear) {
    year = a.slice(`-${shiftDate}`);
  } else {
    year = c.slice(shiftDate);
  }

  if (shiftDate > a.length) {
    year = a < 30 ? '20' + a : '19' + a;
  }

  const newDate = [];

  if (isFirstYearNew) {
    newDate.push(year, b, c);
  } else if (isSecondYear) {
    newDate.push(c, a, b);
  } else if (isFirstYear) {
    newDate.push(c, b, year);
  } else {
    newDate.push(a, b, year);
  }

  return newDate.join(newSeparator);
}

module.exports = formatDate;
