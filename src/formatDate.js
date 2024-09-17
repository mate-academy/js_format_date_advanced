'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const YEAR_SHORT_LENGTH = 2;
  const CURRENT_YEAR_SHORT = '23';
  const formatValuesLen = fromFormat.length - 1;
  const oldSeparator = fromFormat[formatValuesLen];
  const newSeparator = toFormat[formatValuesLen];
  const splittedDate = date.split(oldSeparator);
  let year = '';
  let month = '';
  let day = '';
  const formattedDate = [];

  for (let i = 0; i < formatValuesLen; i++) {
    if (fromFormat[i].includes('Y')) {
      const yearFormat = fromFormat[i];

      year = splittedDate[i];

      if (yearFormat.length === YEAR_SHORT_LENGTH) {
        if (year < CURRENT_YEAR_SHORT) {
          year = `20${year}`;
        } else {
          year = `19${year}`;
        }
      }
    }

    if (fromFormat[i] === 'MM') {
      month = splittedDate[i];
    }

    if (fromFormat[i] === 'DD') {
      day = splittedDate[i];
    }
  }

  for (let i = 0; i < formatValuesLen; i++) {
    if (toFormat[i] === 'YYYY') {
      formattedDate[i] = year;
    }

    if (toFormat[i] === 'YY') {
      formattedDate[i] = year.slice(-2);
    }

    if (toFormat[i] === 'MM') {
      formattedDate[i] = month;
    }

    if (toFormat[i] === 'DD') {
      formattedDate[i] = day;
    }
  }

  return formattedDate.join(newSeparator);
}

module.exports = formatDate;
