'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldSeparator = fromFormat[3];
  let oldYear = 0;
  let oldDay = 0;
  let oldMonth = 0;
  const oldArrayDate = date.split(`${oldSeparator}`);

  for (let i = 0; i < 3; i++) {
    const currElement = fromFormat[i];

    if (currElement === 'YY' || currElement === 'YYYY') {
      oldYear = oldArrayDate[i];
    }

    if (currElement === 'DD') {
      oldDay = oldArrayDate[i];
    }

    if (currElement === 'MM') {
      oldMonth = oldArrayDate[i];
    }
  }

  let result = '';
  const newSeparator = toFormat[3];

  for (let i = 0; i < 3; i++) {
    const currElement = toFormat[i];

    if (currElement === 'YYYY') {
      if (oldYear.length === 4) {
        result += oldYear;
      } else {
        if (Number.parseInt(oldYear) < 30) {
          result += '20';
          result += oldYear;
        } else {
          result += '19';
          result += oldYear;
        }
      }
    }

    if (currElement === 'YY') {
      if (oldYear.length === 2) {
        result += oldYear;
      } else {
        result += oldYear.slice(2);
      }
    }

    if (currElement === 'DD') {
      result += oldDay;
    }

    if (currElement === 'MM') {
      result += oldMonth;
    }

    if (i !== 2) {
      result += newSeparator;
    }
  }

  return result;
}

module.exports = formatDate;
