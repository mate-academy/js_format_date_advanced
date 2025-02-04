'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const splitFromFormat = fromFormat.find(
    (formatMethod) => formatMethod.length === 1,
  );
  const splitToFormat = toFormat.find(
    (formatMethod) => formatMethod.length === 1,
  );

  const splitDate = date.split(splitFromFormat);

  let day = '';
  let month = '';
  let year = '';

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i] === 'YYYY') {
      year = splitDate[i];
    } else if (fromFormat[i] === 'YY') {
      if (parseInt(splitDate[i]) < 30) {
        year = `20${splitDate[i]}`;
      } else {
        year = `19${splitDate[i]}`;
      }
    } else if (fromFormat[i] === 'MM') {
      month = splitDate[i];
    } else if (fromFormat[i] === 'DD') {
      day = splitDate[i];
    }
  }

  let newDate = '';

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i] === 'YYYY') {
      newDate += year;
    } else if (toFormat[i] === 'MM') {
      newDate += month;
    } else if (toFormat[i] === 'DD') {
      newDate += day;
    } else if (toFormat[i] === 'YY') {
      year = year.slice(2);
      newDate += year;
    }

    if (i < toFormat.length - 2) {
      newDate += splitToFormat;
    }
  }

  return newDate;
}

module.exports = formatDate;
