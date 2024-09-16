'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const getYearFormat = (year) => {
    if (year.length === 2) {
      const shortYear = parseInt(year, 10);

      return shortYear < 30 ? `20${year}` : `19${year}`;
    }

    return year;
  };

  const parseDate = (dateString, format) => {
    const parts = dateString.split(format[format.length - 1]);
    const dateObj = {};

    format.forEach((part, index) => {
      dateObj[part] = parts[index];
    });

    return dateObj;
  };

  const formatDatePart = (dateObj, format) => {
    return format.map((part) => dateObj[part]).join(format[format.length - 1]);
  };

  const parsedDate = parseDate(date, fromFormat);
  const formattedYear = getYearFormat(parsedDate['YYYY'] || parsedDate['YY']);

  if (toFormat.includes('YYYY')) {
    parsedDate['YYYY'] = formattedYear;
    delete parsedDate['YY'];
  } else {
    parsedDate['YY'] = formattedYear.slice(2);
    delete parsedDate['YYYY'];
  }

  let result = formatDatePart(parsedDate, toFormat);

  result = result.replace(/[/.,-]+$/, '');

  return result;
}

module.exports = formatDate;
