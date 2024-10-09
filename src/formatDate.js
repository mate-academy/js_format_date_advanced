'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormatArray, toFormatArray) {
  // Separator (old and new)
  const separatorFrom = fromFormatArray[3];
  const separatorTo = toFormatArray[3];

  const dateParts = date.split(separatorFrom);

  // converter for the year format (important: different lengths)
  function convertYear(year, fromYearFormat, toYearFormat) {
    if (fromYearFormat === 'YYYY' && toYearFormat === 'YY') {
      return year.slice(-2);
    }

    if (fromYearFormat === 'YY' && toYearFormat === 'YYYY') {
      const yy = parseInt(year, 10);

      return yy < 30 ? '20' + year : '19' + year;
    }

    return year;
  }

  const newDateParts = toFormatArray.slice(0, 3).map((format) => {
    let fromIndex = fromFormatArray.indexOf(format);

    if (fromIndex === -1) {
      fromIndex = fromFormatArray.indexOf(format === 'YYYY' ? 'YY' : 'YYYY');
    }

    if (format === 'YY' || format === 'YYYY') {
      return convertYear(
        dateParts[fromIndex],
        fromFormatArray[fromIndex],
        format,
      );
    }

    return dateParts[fromIndex];
  });

  return newDateParts.join(separatorTo);
}

module.exports = formatDate;
