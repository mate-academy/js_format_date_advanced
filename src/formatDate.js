'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateArr = date.split(fromFormat[fromFormat.length - 1]);

  let day;
  let month;
  let year;
  const newFormDate = [];
  const separator = toFormat[toFormat.length - 1];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    switch (fromFormat[i]) {
      case 'DD':
        day = dateArr[i];
        break;
      case 'MM':
        month = dateArr[i];
        break;
      default:
        year = dateArr[i];
        break;
    };
  };

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'DD') {
      newFormDate.push(day);
    };

    if (toFormat[i] === 'MM') {
      newFormDate.push(month);
    };

    if (toFormat[i] === 'YY') {
      if (year.length > 2) {
        newFormDate.push(year.slice(2));
      } else {
        newFormDate.push(year);
      };
    };

    if (toFormat[i] === 'YYYY') {
      if (year.length === 2 && year >= 30) {
        newFormDate.push(`19${year}`);
      };

      if (year.length === 2 && year < 30) {
        newFormDate.push(`20${year}`);
      };

      if (year.length === 4) {
        newFormDate.push(year);
      };
    };
  };

  return newFormDate.join(separator);
}

module.exports = formatDate;
