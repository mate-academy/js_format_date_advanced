'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separatorFrom = fromFormat[fromFormat.length - 1];
  const separatorTo = toFormat[toFormat.length - 1];
  const formatsFrom = fromFormat.slice(0, -1);
  const formatsTo = toFormat.slice(0, -1);
  const splitDate = date.split(separatorFrom);
  const dateMap = {};

  formatsFrom.forEach((format, index) => {
    dateMap[format] = splitDate[index];
  });

  const transformedDate = formatsTo.map((format) => {
    if (format === 'YY' || format === 'YYYY') {
      const fromYearFormat = formatsFrom.find((f) => f.includes('Y'));

      if (!dateMap[fromYearFormat]) {
        throw new Error(`Format ${fromYearFormat} is missing in date: ${date}`);
      }

      return convertYear(dateMap[fromYearFormat], fromYearFormat, format);
    }

    return dateMap[format] || '';
  });

  return transformedDate.join(separatorTo);
}

function convertYear(year, fromFormat, toFormat) {
  if (fromFormat === 'YYYY' && toFormat === 'YY') {
    return year.slice(-2);
  }

  if (fromFormat === 'YY' && toFormat === 'YYYY') {
    const numericYear = parseInt(year, 10);

    return numericYear < 30 ? '20' + year : '19' + year;
  }

  return year;
}

module.exports = formatDate;
