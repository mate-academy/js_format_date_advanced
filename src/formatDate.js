'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date = new Date(), fromFormat, toFormat) {
  const formatedDate = [];
  const seperator = fromFormat.pop();
  const newSeperator = toFormat.pop();
  const dateInput = date.split(seperator);
  let day = null;
  let month = null;
  let year = null;

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i] === 'DD') {
      day = dateInput[i];
    }

    if (fromFormat[i] === 'MM') {
      month = dateInput[i];
    }

    if (fromFormat[i] === 'YYYY') {
      year = dateInput[i];
    }

    if (fromFormat[i] === 'YY') {
      if (dateInput[i] > 20 && dateInput[i] < 99) {
        year = '19' + dateInput[i];
      } else {
        year = '20' + dateInput[i];
      }
    }
  }

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i] === 'DD') {
      formatedDate.push(day);
    }

    if (toFormat[i] === 'MM') {
      formatedDate.push(month);
    }

    if (toFormat[i] === 'YYYY') {
      formatedDate.push(year);
    }

    if (toFormat[i] === 'YY') {
      formatedDate.push(year.substr(2, 4));
    }
  }

  return formatedDate.join(newSeperator);
}

module.exports = formatDate;
