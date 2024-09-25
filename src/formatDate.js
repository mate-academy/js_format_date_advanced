'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateParts = date.split(fromFormat.pop());
  const dateObj = {};

  fromFormat.forEach(function (part, i) {
    dateObj[part] = dateParts[i];
  });

  const convertYear = (year, format) => {
    if (format === 'YYYY') {
      return year.length === 2 ? (year < 30 ? '20' + year : '19' + year) : year;
    }

    return year.length === 4 ? year.slice(2) : year;
  };

  const resultParts = toFormat.slice(0, -1).map((part) => {
    if (part === 'YYYY' || part === 'YY') {
      const yearFormat = fromFormat.find((f) => f.includes('Y'));

      return convertYear(dateObj[yearFormat], part);
    }

    return dateObj[part];
  });

  return resultParts.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
