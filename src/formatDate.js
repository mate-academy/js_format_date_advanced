/* eslint-disable no-console */
'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  let year = '';
  let day = '';
  let month = '';
  const init = date.split(fromFormat[3]);
  const yearIdentifiers = ['YYYY', 'YY'];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (yearIdentifiers.includes(fromFormat[i])) {
      year = init[i];
    }

    if (fromFormat[i] === 'MM') {
      month = init[i];
    }

    if (fromFormat[i] === 'DD') {
      day = init[i];
    }
  }

  const newDate = [];

  for (const el of toFormat) {
    if (el === 'YYYY') {
      if (year.length === 4) {
        newDate.push(year);
      }

      if (year.length === 2) {
        if (+year < 30) {
          newDate.push(20 + year);
        } else {
          newDate.push(19 + year);
        }
      }
    }

    if (el === 'YY') {
      if (year.length === 4) {
        newDate.push(year[2] + year[3]);
      } else {
        newDate.push(year);
      }
    }

    if (el === 'MM') {
      newDate.push(month);
    }

    if (el === 'DD') {
      newDate.push(day);
    }
  }

  return newDate.join(toFormat[3]);
}

module.exports = formatDate;
