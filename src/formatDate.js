'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const defineYear = () => year < 30
    ? result.push(20 + year)
    : result.push(19 + year);

  const separatorFrom = fromFormat[3];
  const separatorToFormat = toFormat[3];

  const splitedDate = date.split(separatorFrom);

  const result = [];
  let year, month, day;

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i] === 'YYYY' || fromFormat[i] === 'YY') {
      year = splitedDate[i];
      continue;
    }

    if (fromFormat[i] === 'MM') {
      month = splitedDate[i];
      continue;
    }

    if (fromFormat[i] === 'DD') {
      day = splitedDate[i];
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'YYYY' && year.length === 4) {
      result.push(year);
      continue;
    }

    if (toFormat[i] === 'YY' && year.length === 4) {
      result.push(year.slice(2));
      continue;
    }

    if (toFormat[i] === 'YYYY' && year.length === 2) {
      defineYear(year);
      continue;
    }

    if (toFormat[i] === 'MM') {
      result.push(month);
      continue;
    }

    if (toFormat[i] === 'DD') {
      result.push(day);
    }
  }

  return result.join(separatorToFormat);
}

module.exports = formatDate;
