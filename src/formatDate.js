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

  fromFormat.forEach((format, index) => {
    if (format === 'YYYY' || format === 'YY') {
      year = dateParts[index];
    } else if (format === 'MM') {
      month = dateParts[index];
    } else if (format === 'DD') {
      day = dateParts[index];
    }
  });

  const dateMap = {
    YYYY: year.length === 2 ? (year < '30' ? '20' + year : '19' + year) : year,
    YY: year.length === 4 ? year.slice(-2) : year,
    MM: month,
    DD: day,
  };

  const newDateParts = toFormat
    .filter((format) => format !== toSeparator)
    .map((format) => dateMap[format]);

  return newDateParts.join(toSeparator);
}

module.exports = formatDate;
