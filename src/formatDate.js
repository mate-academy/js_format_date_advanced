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
  let splitDate = date.split(fromFormat[3]);
  let year = 0;
  let month = 0;
  let day = 0;


  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i] === 'YY' || fromFormat[i] === 'YYYY') {
      year = splitDate[i];
    };
  };

  let yearLengthTo = 0;
  let yearLengthFrom = 0;
  for (const ch of toFormat) {
    if (ch === 'YY' || ch === 'YYYY') {
      yearLengthTo = ch.length;
    };
  };

  for (const ch of fromFormat) {
    if (ch === 'YY' || ch === 'YYYY') {
      yearLengthFrom = ch.length;
    };
  };

  if (yearLengthTo < yearLengthFrom) {
    year = year.slice(2);
  };

  if (yearLengthTo > yearLengthFrom) {
    if (year >= 30) {
      year = 1900 + +year;
    };

    if (year < 30) {
      year = 2000 + +year;
    };
  };

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i] === 'MM') {
      month = splitDate[i];
    };
  };

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i] === 'DD') {
      day = splitDate[i];
    };
  };

  const newFormat = [];

  for (const ch of toFormat) {
    switch (ch) {
      case 'YY':
        newFormat.push(year);
        break;

      case 'YYYY':
        newFormat.push(year);
        break;

      case 'MM':
        newFormat.push(month);
        break;

      case 'DD':
        newFormat.push(day);
        break;

      default:
        break;
    };
  };

  const newDate = newFormat.join(toFormat[3]);

  return newDate;
}

module.exports = formatDate;
