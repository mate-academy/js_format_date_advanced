'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const newDateArr = [];
  let month = '';
  let day = '';
  let year = '';

  const separator = fromFormat[fromFormat.length - 1];
  const newSeparator = toFormat[toFormat.length - 1];
  const dateArr = date.split(separator);

  const requiredYearFormat = toFormat.find(
    (element) => element === 'YYYY' || element === 'YY',
  );

  const changeYearFormat = () => {
    if (requiredYearFormat.length === 4 && year.length === 4) {
      return year;
    }

    if (requiredYearFormat.length === 4 && year < 30) {
      return `20${year}`;
    }

    if (requiredYearFormat.length === 4 && year >= 30) {
      return `19${year}`;
    }

    if (requiredYearFormat.length === 2) {
      return year.slice(-2);
    }
  };

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i] === 'YYYY' || fromFormat[i] === 'YY') {
      year = dateArr[i];
    }

    if (fromFormat[i] === 'DD') {
      day = dateArr[i];
    }

    if (fromFormat[i] === 'MM') {
      month = dateArr[i];
    }
  }

  year = changeYearFormat();

  for (let j = 0; j < toFormat.length; j++) {
    if (toFormat[j] === 'YYYY' || toFormat[j] === 'YY') {
      newDateArr.push(year);
    }

    if (toFormat[j] === 'DD') {
      newDateArr.push(day);
    }

    if (toFormat[j] === 'MM') {
      newDateArr.push(month);
    }
  }

  return newDateArr.join(newSeparator);
}

module.exports = formatDate;
