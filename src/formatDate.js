'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateParts = date.split(fromFormat[fromFormat.length - 1]);
  const formattedDateParts = [];
  const joinElement = toFormat[3];

  for (let i = 0; i < toFormat.length - 1; i++) {
    const format = toFormat[i];
    const formatIndex = fromFormat.indexOf(format);

    if (formatIndex !== -1) {
      formattedDateParts.push(dateParts[formatIndex]);
    } else if (format === 'YY') {
      const year = parseInt(dateParts[fromFormat.indexOf('YYYY')], 10) % 100;

      formattedDateParts.push(year.toString().padStart(2, '0'));
    } else if (format === 'YYYY' && dateParts[fromFormat.indexOf('YY')] >= 30) {
      formattedDateParts.push('19' + dateParts[fromFormat.indexOf('YY')]);
    } else if (format === 'YYYY') {
      formattedDateParts.push('20' + dateParts[fromFormat.indexOf('YY')]);
    } else {
      formattedDateParts.push(format);
    }
  }

  return formattedDateParts.join(joinElement);
}

module.exports = formatDate;
