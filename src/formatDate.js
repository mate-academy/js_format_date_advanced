'use strict';

function makeYearYYYY(yearFormat, value) {
  if (yearFormat === 'YYYY') {
    return value;
  }

  if (value < 30) {
    return `20${value}`;
  } else {
    return `19${value}`;
  }
}

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const dateArray = date.split(fromFormat[fromFormat.length - 1]);
  const dateObject = {
    day: null,
    month: null,
    year: null, // YYYY
  };
  let newFormatDate = '';

  for (let i = 0; i < dateArray.length; i++) {
    if (fromFormat[i] === 'DD') {
      dateObject.day = dateArray[i];
    }

    if (fromFormat[i] === 'MM') {
      dateObject.month = dateArray[i];
    }

    if (fromFormat[i].includes('Y')) {
      dateObject.year = makeYearYYYY(fromFormat[i], dateArray[i]);
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'DD') {
      newFormatDate += dateObject.day;
    }

    if (toFormat[i] === 'MM') {
      newFormatDate += dateObject.month;
    }

    if (toFormat[i] === 'YY') {
      newFormatDate += dateObject.year.slice(2);
    }

    if (toFormat[i] === 'YYYY') {
      newFormatDate += dateObject.year;
    }

    if (i < toFormat.length - 2) {
      newFormatDate += toFormat[toFormat.length - 1];
    }
  }

  return newFormatDate;
}

module.exports = formatDate;
