'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromFormatCopy = [...fromFormat];
  const toFormatCopy = [...toFormat];

  const fromSeparator = fromFormatCopy.pop();
  const toSeparator = toFormatCopy.pop();

  const dateParts = date.split(fromSeparator);

  const dateMap = {};

  fromFormatCopy.forEach((part, index) => {
    dateMap[part] = dateParts[index];
  });

  if (dateMap['YYYY']) {
    dateMap['YY'] = dateMap['YYYY'].slice(-2);
  }

  if (dateMap['YY']) {
    const yy = parseInt(dateMap['YY'], 10);

    dateMap['YYYY'] = (yy < 30 ? '20' : '19') + dateMap['YY'];
  }

  const newDateParts = toFormatCopy.map((part) => dateMap[part]);

  return newDateParts.join(toSeparator);
}

module.exports = formatDate;
