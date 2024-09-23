'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const [fromSeparator] = fromFormat.splice(-1, 1);
  const [toSeparator] = toFormat.splice(-1, 1);

  const dateElements = date.split(fromSeparator);

  const convertYear = (year, format) => {
    if (format === 'YYYY') {
      return year.length === 2 ? (year < 30 ? '20' + year : '19' + year) : year;
    }

    if (format === 'YY') {
      return year.slice(-2);
    }

    return year;
  };

  const dateMap = fromFormat.reduce((acc, format, index) => {
    acc[format] = dateElements[index];

    return acc;
  }, {});

  return toFormat
    .map((format) => {
      if (format === 'YY' || format === 'YYYY') {
        return convertYear(dateMap['YYYY'] || dateMap['YY'], format);
      }

      return dateMap[format].padStart(2, '0');
    })
    .join(toSeparator);
}

module.exports = formatDate;
