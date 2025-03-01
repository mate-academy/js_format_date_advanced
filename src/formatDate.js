'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateSplit = date.split(fromFormat.pop());
  let month = '';
  let day = '';
  let year = '';

  const result = [];

  for (let count = 0; count < 3; count++) {
    if (fromFormat[count] === 'MM') {
      month = dateSplit[count];
    }

    if (fromFormat[count] === 'DD') {
      day = dateSplit[count];
    }

    if (fromFormat[count] === 'YYYY') {
      year = dateSplit[count];
    }

    if (fromFormat[count] === 'YY') {
      const number = parseInt(dateSplit[count]);

      if (number < 30) {
        year = (2000 + number).toString();
      } else {
        year = (1900 + number).toString();
      }
    }
  }

  // return [day, month, year];

  for (let count = 0; count < 3; count++) {
    const variable = toFormat[count];

    if (variable === 'MM') {
      result.push(month);
    }

    if (variable === 'DD') {
      result.push(day);
    }

    if (variable === 'YYYY') {
      result.push(year);
    }

    if (variable === 'YY') {
      result.push(year.slice(2));
    }
  }

  return result.join(toFormat.pop());
}

module.exports = formatDate;
