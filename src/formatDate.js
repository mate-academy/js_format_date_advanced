'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat.pop();
  const toSeparator = toFormat.pop();
  const dateParts = date.split(fromSeparator);
  const newDateParts = [];

  for (const format of toFormat) {
    let fromFormatIndex = fromFormat.indexOf(format);
    let part = dateParts[fromFormatIndex];

    if (fromFormatIndex === -1) {
      if (format === 'YY') {
        fromFormatIndex = fromFormat.indexOf('YYYY');
        part = dateParts[fromFormatIndex].slice(-2);
      }

      if (format === 'YYYY') {
        fromFormatIndex = fromFormat.indexOf('YY');
        part = dateParts[fromFormatIndex];

        let year = parseInt(part);

        year = year < 30 ? 2000 + year : 1900 + year;
        part = year.toString();
      }
    }

    newDateParts.push(part);
  }

  return newDateParts.join(toSeparator);
}

module.exports = formatDate;
