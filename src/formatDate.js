'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateArray = date.split(fromFormat[fromFormat.length - 1]);
  const newDate = [];

  let day;
  let month;
  let year;
  let yearShort;

  for (let i = 0; i < dateArray.length; i++) {
    switch (true) {
      case fromFormat[i] === 'DD':
        day = dateArray[i];
        break;

      case fromFormat[i] === 'MM':
        month = dateArray[i];
        break;

      case fromFormat[i] === 'YY' && dateArray[i] < 30:
        year = `${20 + dateArray[i]}`;
        yearShort = dateArray[i];
        break;

      case fromFormat[i] === 'YY' && dateArray[i] >= 30:
        year = `${19 + dateArray[i]}`;
        yearShort = dateArray[i];
        break;

      case fromFormat[i] === 'YYYY':
        year = dateArray[i];
        yearShort = dateArray[i].slice(0, 2);
        break;
    }
  }

  for (let i = 0; i < dateArray.length; i++) {
    switch (true) {
      case toFormat[i] === 'DD':
        newDate.push(day);
        break;

      case toFormat[i] === 'MM':
        newDate.push(month);
        break;

      case toFormat[i] === 'YY' && yearShort < 30:
        newDate.push(year.slice(2, 4));
        break;

      case toFormat[i] === 'YYYY':
        newDate.push(year);
        break;
    }
  }

  return newDate.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
