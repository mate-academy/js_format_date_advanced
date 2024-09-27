'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const newFormatDate = [];
  const oldSeparator = fromFormat[fromFormat.length - 1];
  const newSeparator = toFormat[toFormat.length - 1];
  const splitedDate = date.split(oldSeparator);
  const lastCentury = '19';
  const currentCentury = '20';

  let day;
  let month;
  let year;

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i].includes('D')) {
      day = splitedDate[i];
    } else if (fromFormat[i].includes('M')) {
      month = splitedDate[i];
    } else if (fromFormat[i].includes('Y')) {
      year = splitedDate[i];
    }
  }

  for (const dateElement of toFormat) {
    if (dateElement.includes('D')) {
      newFormatDate.push(day);
    } else if (dateElement.includes('M')) {
      newFormatDate.push(month);
    } else if (dateElement.includes('Y') && dateElement.length < year.length) {
      newFormatDate.push(year.slice(2));
    } else if (dateElement.includes('Y') && dateElement.length > year.length) {
      newFormatDate.push(
        year < 30
          ? currentCentury + year
          : lastCentury + year
      );
    } else if (
      dateElement.includes('Y')
      && dateElement.length === year.length
    ) {
      newFormatDate.push(year);
    }
  }

  return newFormatDate.join(newSeparator);
}

module.exports = formatDate;
