'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const sepaarator = fromFormat[3];
  const parts = date.split(sepaarator);
  let year;
  let month;
  let day;
  let yearFormat;

  for (let i = 0; i < parts.length; i++) {
    if (fromFormat[i] === 'YYYY' || fromFormat[i] === 'YY') {
      year = parts[i];
      yearFormat = fromFormat[i];
    }

    if (fromFormat[i] === 'MM') {
      month = parts[i];
    }

    if (fromFormat[i] === 'DD') {
      day = parts[i];
    }
  }

  let result = '';
  const newSeparator = toFormat[3];

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'YYYY' || toFormat[i] === 'YY') {
      if (toFormat[i] === 'YY' && yearFormat === 'YYYY') {
        result += year.slice(-2);
      }

      if (toFormat[i] === 'YYYY' && yearFormat === 'YY') {
        if (Number(year) < 30) {
          result += `20${year}`;
        } else {
          result += `19${year}`;
        }
      }

      if (toFormat[i] === yearFormat) {
        result += year;
      }
    }

    if (toFormat[i] === 'MM') {
      result += month;
    }

    if (toFormat[i] === 'DD') {
      result += day;
    }

    if (i < 2) {
      result += newSeparator;
    }
  }

  return result;
}

module.exports = formatDate;
