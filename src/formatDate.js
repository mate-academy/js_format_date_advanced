'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSepatator = fromFormat.pop();
  const toSeparator = toFormat.pop();

  const splitedDate = date.split(fromSepatator);

  const dateToFormat = {};
  const newFormatDate = [];

  for (let formatPoint = 0; formatPoint < fromFormat.length; formatPoint++) {
    dateToFormat[fromFormat[formatPoint][0]] = splitedDate[formatPoint];
  }

  const dateYearToFormat = dateToFormat['Y'];

  for (const format of toFormat) {
    if (format[0] === 'Y' && format.length !== dateYearToFormat.length) {
      if (format.length === 4) {
        if (dateYearToFormat >= 30) {
          newFormatDate.push(19 + dateYearToFormat);
        } else {
          newFormatDate.push(20 + dateYearToFormat);
        }
      } else {
        newFormatDate.push(dateYearToFormat.substr(2));
      }
    } else {
      newFormatDate.push(dateToFormat[format[0]]);
    }
  }

  const newFormatDateString = newFormatDate.join(toSeparator);

  return newFormatDateString;
}

module.exports = formatDate;
