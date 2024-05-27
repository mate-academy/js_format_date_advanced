'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const lastElement = fromFormat.length - 1;
  const separator = date.split(fromFormat[lastElement]);
  const format = {};

  fromFormat.slice(0, -1).forEach((part, index) => {
    format[part] = separator[index];
  });

  const convertYear = (year, targetFormat) => {
    if (targetFormat === 'YY') {
      return year.slice(-2);
    }

    if (targetFormat === 'YYYY') {
      if (year.length === 2) {
        return (year < 30 ? '20' : '19') + year;
      }

      return year;
    }

    return year;
  };

  const formattedDate = toFormat.slice(0, -1).map((part) => {
    if (part === 'YY' || part === 'YYYY') {
      return convertYear(format['YYYY'] || format['YY'], part);
    }

    return format[part];
  });

  return formattedDate.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
