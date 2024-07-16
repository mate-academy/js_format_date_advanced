'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat.pop();
  const toSeparator = toFormat.pop();

  const dateParts = date.split(fromSeparator);

  const dateMap = {};

  fromFormat.forEach((part, index) => {
    dateMap[part] = dateParts[index];
  });

  if (dateMap['YYYY']) {
    dateMap['YY'] = dateMap['YYYY'].slice(-2);
  }

  if (dateMap['YY']) {
    const yy = parseInt(dateMap['YY'], 10);

    dateMap['YYYY'] = (yy < 30 ? '20' : '19') + dateMap['YY'];
  }

  const newDateParts = toFormat.map((part) => dateMap[part]);

  return newDateParts.join(toSeparator);
}

module.exports = formatDate;
