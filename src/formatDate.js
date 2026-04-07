'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat[3];
  const toSeparator = toFormat[3];

  const dateParts = date.split(fromSeparator);

  let year, month, day;

  fromFormat.slice(0, 3).forEach((part, index) => {
    if (part === 'YYYY' || part === 'YY') {
      year = dateParts[index];
    } else if (part === 'MM') {
      month = dateParts[index];
    } else if (part === 'DD') {
      day = dateParts[index];
    }
  });

  if (year.length === 2 && toFormat.includes('YYYY')) {
    const yearNum = parseInt(year, 10);

    year = yearNum < 30 ? `20${year}` : `19${year}`;
  } else if (year.length === 4 && toFormat.includes('YY')) {
    year = year.slice(-2);
  }

  const resultParts = toFormat.slice(0, 3).map((part) => {
    if (part === 'YYYY' || part === 'YY') {
      return year;
    }

    if (part === 'MM') {
      return month;
    }

    if (part === 'DD') {
      return day;
    }

    return '';
  });

  return resultParts.join(toSeparator);
}
module.exports = formatDate;
