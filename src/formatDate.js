'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldSeparator = fromFormat[3];
  const newSeparator = toFormat[3];
  const newDate = [];
  const dateArray = date.split(oldSeparator);

  for (let i = 0; i < 3; i++) {
    let oldFormatPart = fromFormat[i];
    let dateArrayPart = dateArray[i];

    const isFormatItemLonger = (format1, format2) =>
      format1[i].length > format2[i].length;
    const isItemYear = (format1, format2) => format1[i].slice(2) === format2[i];

    if (isFormatItemLonger(fromFormat, toFormat)
      && isItemYear(fromFormat, toFormat)) {
      oldFormatPart = fromFormat[i].slice(2);
      dateArrayPart = dateArray[i].slice(2);
    } else if (isFormatItemLonger(toFormat, fromFormat)
      && isItemYear(toFormat, fromFormat)) {
      oldFormatPart = 'YY' + fromFormat[i];

      dateArrayPart = dateArray[i] < 30
        ? '20' + dateArray[i]
        : '19' + dateArray[i];
    }

    const index = toFormat.indexOf(oldFormatPart);

    newDate[index] = dateArrayPart;
  }

  return newDate.join(newSeparator);
}

module.exports = formatDate;
