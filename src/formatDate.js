'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const DateToArray = date.split(fromFormat[3]);

  let day;
  let month;
  let year;

  for (let i = 0; i < fromFormat.length - 1; i++) {
    switch (fromFormat[i]) {
      case 'DD':
        day = DateToArray[i];
        break;
      case 'MM':
        month = DateToArray[i];
        break;
      default:
        year = DateToArray[i];
        break;
    };
  };

  const newDate = [];
  const separator = toFormat[3];

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'DD') {
      newDate.push(day);
    };

    if (toFormat[i] === 'MM') {
      newDate.push(month);
    };

    if (toFormat[i] === 'YY') {
      if (year.length > 2) {
        newDate.push(year.slice(-2));
      } else {
        newDate.push(year);
      };
    };

    if (toFormat[i] === 'YYYY') {
      if (year.length === 2 && year >= 30) {
        newDate.push(`19${year}`);
      };

      if (year.length === 2 && year < 30) {
        newDate.push(`20${year}`);
      };

      if (year.length === 4) {
        newDate.push(year);
      };
    };
  };

  return newDate.join(separator);
};

module.exports = formatDate;
