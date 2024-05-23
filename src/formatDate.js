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

  // Extract date parts according to fromFormat
  fromFormat.forEach((format, index) => {
    if (format === 'YYYY' || format === 'YY') {
      year = dateParts[index];
    } else if (format === 'MM') {
      month = dateParts[index];
    } else if (format === 'DD') {
      day = dateParts[index];
    }
  });

  // Convert year formats if necessary
  if (fromFormat[0] === 'YYYY' && toFormat[0] === 'YY') {
    year = year.slice(-2);
  } else if (fromFormat[0] === 'YY' && toFormat[0] === 'YYYY') {
    year = parseInt(year, 10) < 30 ? '20' + year : '19' + year;
  }

  // Create a mapping for easy access to the date parts
  const dateMap = {
    YYYY:
      year.length === 2
        ? parseInt(year, 10) < 30
          ? '20' + year
          : '19' + year
        : year,
    YY: year.length === 4 ? year.slice(-2) : year,
    MM: month,
    DD: day,
  };

  // Construct the new date format
  const newDateParts = toFormat.slice(0, 3).map((format) => dateMap[format]);

  return newDateParts.join(toSeparator);
}

module.exports = formatDate;
