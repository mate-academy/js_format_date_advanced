'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldYear = yearFormatAndPlace(fromFormat);
  const newYear = yearFormatAndPlace(toFormat);

  const formatedDate = [];
  let year = '';

  const dateParts = date.split(fromFormat[3]);
  const newDateSeparator = toFormat[3];

  const thresholdYear = 30;

  if (oldYear.format !== newYear.format) {
    if (oldYear.format.length < newYear.format.length) {
      year =
        dateParts[oldYear.place] < thresholdYear
          ? `20${dateParts[oldYear.place]}`
          : `19${dateParts[oldYear.place]}`;
    } else {
      year = dateParts[oldYear.place].slice(2);
    }
  } else {
    year = dateParts[oldYear.place];
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    switch (toFormat[i]) {
      case 'YYYY':
      case 'YY':
        formatedDate[i] = year;
        break;
      case 'MM':
        formatedDate[i] = dateParts[fromFormat.indexOf('MM')];
        break;
      case 'DD':
        formatedDate[i] = dateParts[fromFormat.indexOf('DD')];
        break;
    }
  }

  return formatedDate.join(newDateSeparator);
}

function yearFormatAndPlace(pattern) {
  const longYearFormat = 'YYYY';
  const shortYearFormat = 'YY';
  let format = '';
  let place = -1;

  for (let i = 0; i < pattern.length; i++) {
    if (pattern[i] === longYearFormat || pattern[i] === shortYearFormat) {
      format = pattern[i];
      place = i;
      break;
    }
  }

  return {
    format,
    place,
  };
}

module.exports = formatDate;
