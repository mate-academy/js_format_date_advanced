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
  const oldDateArray = date.split(oldSeparator);

  let year, month, day;

  const formatYearLong = 'YYYY';
  const formatYearShort = 'YY';
  const formatMonth = 'MM';
  const formatDay = 'DD';

  for (let i = 0; i < fromFormat.length; i++) {
    switch (fromFormat[i]) {
      case formatYearLong:
        year = oldDateArray[i];

        break;

      case formatYearShort:
        year = oldDateArray[i] < 30
          ? '20' + oldDateArray[i]
          : '19' + oldDateArray[i];

        break;

      case formatMonth:
        month = oldDateArray[i];

        break;

      case formatDay:
        day = oldDateArray[i];

        break;
    }
  }

  const newDateArray = [];

  for (const dateFormat of toFormat) {
    switch (dateFormat) {
      case formatYearLong:
        newDateArray.push(year);

        break;

      case formatYearShort:
        newDateArray.push(year.slice(2));

        break;

      case formatMonth:
        newDateArray.push(month);

        break;

      case formatDay:
        newDateArray.push(day);

        break;
    }
  }

  const newSeparator = toFormat[3];

  return newDateArray.join(newSeparator);
}

module.exports = formatDate;
