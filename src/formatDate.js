'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const validFormats = ['YYYY', 'YY', 'MM', 'DD'];
  const dateArr = date.split(fromFormat[3]);
  const dateObj = new Map();

  fromFormat.forEach((format, i) => {
    if (validFormats.includes(format)) dateObj.set(format, dateArr[i]);
  });

  const newDate = toFormat
    .map((format) => {
      if (format === 'YYYY') {
        const year = dateObj.get('YYYY') || dateObj.get('YY');

        return year.length === 2
          ? (parseInt(year) < 30 ? '20' : '19') + year
          : year;
      }

      if (format === 'YY') {
        const year = dateObj.get('YYYY');

        return year ? year.slice(2) : '';
      }

      return dateObj.get(format) || '';
    })
    .join(toFormat[3]);

  return newDate.slice(0, newDate.length - 1);
}

module.exports = formatDate;
