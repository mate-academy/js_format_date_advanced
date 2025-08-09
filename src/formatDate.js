'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat[fromFormat.length - 1];
  const toSeparator = toFormat[toFormat.length - 1];

  const parts = date.split(fromSeparator);

  const dateMap = {};

  for (let i = 0; i < parts.length; i++) {
    const formatPart = fromFormat[i];
    const value = parts[i];

    if (formatPart === 'YYYY' || formatPart === 'YY') {
      dateMap.year = value;
    } else if (formatPart === 'MM') {
      dateMap.month = value;
    } else if (formatPart === 'DD') {
      dateMap.day = value;
    }
  }

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    const year = parseInt(dateMap.year);

    if (year < 30) {
      dateMap.year = `20${dateMap.year.padStart(2, '0')}`;
    } else {
      dateMap.year = `19${dateMap.year.padStart(2, '0')}`;
    }
  } else if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    dateMap.year = dateMap.year.slice(-2);
  }

  const result = toFormat
    .slice(0, -1)
    .map((part) => {
      if (part === 'YYYY' || part === 'YY') {
        return dateMap.year;
      } else if (part === 'MM') {
        return dateMap.month;
      } else if (part === 'DD') {
        return dateMap.day;
      }
    })
    .join(toSeparator);

  return result;
}

module.exports = formatDate;
