'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const newFormat = [];
  const dateArr = date.split(fromFormat[3]);
  const dateYear = dateArr[fromFormat.indexOf('YYYY')]
    || dateArr[fromFormat.indexOf('YY')];

  for (const format of toFormat) {
    switch (format) {
      case 'DD':
      case 'MM':
        newFormat.push(dateArr[fromFormat.indexOf(format)]);
        break;

      case 'YYYY':
        if (format.length > dateYear.length) {
          newFormat.push((dateYear < 30 ? 20 : 19) + dateYear);
        } else {
          newFormat.push(dateYear);
        }
        break;

      case 'YY':
        if (format.length < dateYear.length) {
          newFormat.push(dateYear.slice(2, 4));
        } else {
          newFormat.push(dateYear);
        }
        break;
    }
  }

  return newFormat.join(toFormat[3]);
}

module.exports = formatDate;
