'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  date = date.split(fromFormat[3]);

  // Parse date from string
  const parsedDate = parseDate(date, fromFormat);

  // Convert year to desired format
  const convertedYear = convertYear(parsedDate.year, parsedDate.year_format, toFormat);

  // Format date
  const result = toFormat.slice(0, 3).join(toFormat[3])
    .replace('DD', parsedDate.day)
    .replace('MM', parsedDate.month)
    .replace('YYYY', convertedYear)
    .replace('YY', convertedYear);

  return result;
}

function convertYear(year, originalFormat, toFormat) {
  if (toFormat.includes('YY') && originalFormat === 'YYYY') {
    return year.slice(2, 4);
  }

  if (toFormat.includes('YYYY') && originalFormat === 'YY') {
    return +year < 30
      ? '20' + year
      : '19' + year;
  }

  return year;
}

function parseDate(date, format) {
  let parsedDate = {}

  if (format.includes('YY')) {
    parsedDate['year_format'] = 'YY';
    parsedDate['year'] = date[format.indexOf('YY')];
  } else {
    parsedDate['year_format'] = 'YYYY';
    parsedDate['year'] = date[format.indexOf('YYYY')];
  }

  parsedDate['day'] = date[format.indexOf('DD')];
  parsedDate['month'] = date[format.indexOf('MM')];

  return parsedDate;
}

module.exports = formatDate;
