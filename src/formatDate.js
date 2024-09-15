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
  const oldDate = date.split(fromSeparator);
  const newDate = [];

  let year;
  let month;
  let day;

  for (const index in fromFormat) {
    const toFormatPart = fromFormat[index];
    const oldDatePart = oldDate[index];

    if (toFormatPart.includes('YY')) {
      year = oldDatePart;
    }

    if (toFormatPart.includes('MM')) {
      month = oldDatePart;
    }

    if (toFormatPart.includes('DD')) {
      day = oldDatePart;
    }
  }

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    year = year < 30 ? `20${year}` : `19${year}`;
  }

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    year = year < 30 ? year - 2000 : year - 1900;
  }

  for (const toFormatPart of toFormat) {
    if (toFormatPart.includes('YY')) {
      newDate.push(year);
    }

    if (toFormatPart.includes('MM')) {
      newDate.push(month);
    }

    if (toFormatPart.includes('DD')) {
      newDate.push(day);
    }
  }

  return newDate.join(toSeparator);
}

module.exports = formatDate;

module.exports = formatDate;
